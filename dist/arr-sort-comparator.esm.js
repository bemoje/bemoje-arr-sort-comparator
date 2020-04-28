import assertType from '@bemoje/assert-type';
import isFunction from '@bemoje/is-function';
import isString from '@bemoje/is-string';
import log10 from '@bemoje/math-log10-approx';
import POW10 from '@bemoje/math-pow10-pre-computed';
import oGet from '@bemoje/o-get';

const DEFAULTS = {
	numeric: false,
	arrays: false,
	descending: false,
	by: void 0,
};

/**
 * Create array comparator function.
 * @param {object} [options]
 * @param {boolean} [options.numeric=false] - Sort numerically. Defaults to lexicographic/alphabetic sort.
 * @param {boolean} [options.descending=false] - Sort in descending order. Defaults to ascending order.
 * @param {boolean} [options.array=false] - Sort arrays. Nested arrays are also compared recursively.
 * @param {number|string|getter} [options.by=undefined] - Sort by either array index, a callback(element): any - or by object keys with dot-notation support.
 * @returns {comparator}
 */
function arrSortComparator(options) {
	let { numeric, arrays, descending, by } = { ...DEFAULTS, ...options };

	assertType(Boolean, numeric);
	assertType(Boolean, descending);
	assertType(Boolean, arrays);
	assertType([Number, String, Function], by);

	if (numeric) {
		if (arrays) {
			if (descending) {
				if (by) {
					return sortNumeric.arrays.desc.by(by)
				} else {
					return sortNumeric.arrays.desc
				}
			} else {
				if (by) {
					return sortNumeric.arrays.asc.by(by)
				} else {
					return sortNumeric.arrays.asc
				}
			}
		} else {
			if (descending) {
				if (by) {
					return sortNumeric.desc.by(by)
				} else {
					return sortNumeric.desc
				}
			} else {
				if (by) {
					return sortNumeric.asc.by(by)
				} else {
					return sortNumeric.asc
				}
			}
		}
	} else {
		if (arrays) {
			if (descending) {
				if (by) {
					return sortAlpha.arrays.desc.by(by)
				} else {
					return sortAlpha.arrays.desc
				}
			} else {
				if (by) {
					return sortAlpha.arrays.asc.by(by)
				} else {
					return sortAlpha.arrays.asc
				}
			}
		} else {
			if (descending) {
				if (by) {
					return sortAlpha.desc.by(by)
				} else {
					return sortAlpha.desc
				}
			} else {
				if (by) {
					return sortAlpha.asc.by(by)
				} else {
					return sortAlpha.asc
				}
			}
		}
	}
}

/**
 * @callback comparator
 * @param {*} a - The first value to compare
 * @param {*} b - The second value to compare
 * @returns {number} A negative number if a > b, a positive number if a < b, 0 otherwise.
 */

/**
 * @callback getter
 * @param {*} a - The value
 * @returns {*} The value to be compared
 */

function compareArrays(comparator, _isDesc) {
	const orderMultiplier = _isDesc ? -1 : 1;

	return function recursiveCompare(a, b, _lenCompareParent) {
		const aIsArr = Array.isArray(a);
		const bIsArr = Array.isArray(b);

		if (aIsArr) {
			if (bIsArr) {
				const aLen = a.length;
				const bLen = b.length;

				let lenShortest, lenCompare;

				if (aLen > bLen) {
					lenShortest = aLen;
					lenCompare = 1 * orderMultiplier;
				} else if (aLen < bLen) {
					lenShortest = bLen;
					lenCompare = -1 * orderMultiplier;
				} else {
					lenShortest = aLen;
					lenCompare = 0;
				}

				for (let i = 0, len = lenShortest; i < len; i++) {
					const res = recursiveCompare(a[i], b[i], lenCompare);
					if (res !== 0) {
						return res
					}
				}
			} else {
				return 1 * orderMultiplier
			}
		} else {
			if (bIsArr) {
				return -1 * orderMultiplier
			} else {
				const res = comparator(a, b);
				if (res === 0) {
					return _lenCompareParent
				} else {
					return res
				}
			}
		}
		return 0
	}
}

function compareBy(by, comparator) {
	return function (a, b) {
		if (isString(by)) {
			a = oGet(a, by);
			b = oGet(b, by);
		} else if (Number.isInteger(by)) {
			a = a[by];
			b = b[by];
		} else if (isFunction(by)) {
			a = by(a);
			b = by(b);
		}

		return comparator(a, b)
	}
}

/**
 * Numerical comparison of items. If the passed objects are not numbers, their .valueOf() methods are called to retrieve a numeric value representation of them.
 * @param {number|object} a - First item to compare.
 * @param {number|object} b - Second item to compare.
 * @returns {number} - A positive number if a > b, a negative number if a < b, 0 otherwise.
 */
function sortNumeric(a, b) {
	return a - b
}

sortNumeric.asc = sortNumeric;
sortNumeric.desc = (a, b) => sortNumeric(b, a);

sortNumeric.arrays = {};
sortNumeric.arrays.asc = compareArrays(sortNumeric.asc, false);
sortNumeric.arrays.desc = compareArrays(sortNumeric.desc, true);

sortNumeric.by = {};
sortNumeric.asc.by = (by) => compareBy(by, sortNumeric.asc);
sortNumeric.desc.by = (by) => compareBy(by, sortNumeric.desc);

sortNumeric.arrays.by = {};
sortNumeric.arrays.asc.by = (by) => compareBy(by, sortNumeric.arrays.asc);
sortNumeric.arrays.desc.by = (by) => compareBy(by, sortNumeric.arrays.desc);

/**
 * Alphabetical comparison of items.
 * @param {string|object|number} a - First element to compare.
 * @param {string|object|number} b - Second element to compare.
 * @returns {number} - A positive number if a.toString() > b.toString(), a negative number if .toString() < b.toString(), 0 otherwise.
 */
function sortAlpha(a, b) {
	if (a === b) {
		return 0
	}

	if (~~a === a && ~~b === b) {
		if (a === 0 || b === 0) {
			return a < b ? -1 : 1
		}

		if (a < 0 || b < 0) {
			if (b >= 0) {
				return -1
			}

			if (a >= 0) {
				return 1
			}

			a = -a;
			b = -b;
		}

		const al = log10(a);
		const bl = log10(b);

		let t = 0;

		if (al < bl) {
			a *= POW10[bl - al - 1];
			b /= 10;
			t = -1;
		} else if (al > bl) {
			b *= POW10[al - bl - 1];
			a /= 10;
			t = 1;
		}

		if (a === b) {
			return t
		}

		return a < b ? -1 : 1
	}

	let aStr = String(a);
	let bStr = String(b);

	if (aStr === bStr) {
		return 0
	}

	return aStr < bStr ? -1 : 1
}

sortAlpha.asc = sortAlpha;
sortAlpha.desc = (a, b) => sortAlpha(b, a);

sortAlpha.arrays = {};
sortAlpha.arrays.asc = compareArrays(sortAlpha.asc, false);
sortAlpha.arrays.desc = compareArrays(sortAlpha.desc, true);

sortAlpha.by = {};
sortAlpha.asc.by = (by) => compareBy(by, sortAlpha.asc);
sortAlpha.desc.by = (by) => compareBy(by, sortAlpha.desc);

sortAlpha.arrays.by = {};
sortAlpha.arrays.asc.by = (by) => compareBy(by, sortAlpha.arrays.asc);
sortAlpha.arrays.desc.by = (by) => compareBy(by, sortAlpha.arrays.desc);

export default arrSortComparator;
