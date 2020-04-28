import compare from '../src/arr-sort-comparator'

const log = console.log

describe('arrSortComparator', () => {
	test('sort alpha - ascending', () => {
		const arr = ['5', '2', '4', '30', '1', '3']

		log(arr.sort(compare()))

		const expected = ['1', '2', '3', '30', '4', '5']

		expect(arr).toStrictEqual(expected)
	})

	test('sort alpha - descending', () => {
		const arr = ['5', '2', '4', '30', '1', '3']

		log(
			arr.sort(
				compare({
					numeric: false,
					descending: true,
				}),
			),
		)

		const expected = ['5', '4', '30', '3', '2', '1']

		expect(arr).toStrictEqual(expected)
	})

	test('sort numeric - ascending', () => {
		const arr = [5, 2, 4, 30, 1, 3]

		log(
			arr.sort(
				compare({
					numeric: true,
				}),
			),
		)

		const expected = [1, 2, 3, 4, 5, 30]

		expect(arr).toStrictEqual(expected)
	})

	test('sort numeric - descending', () => {
		const arr = [5, 2, 4, 30, 1, 3]

		log(
			arr.sort(
				compare({
					numeric: true,
					descending: true,
				}),
			),
		)

		const expected = [30, 5, 4, 3, 2, 1]

		expect(arr).toStrictEqual(expected)
	})

	test('sort by index - numeric - ascending', () => {
		const arr = [
			[0, 3, 0],
			[0, 1, 0],
			[0, 2, 0],
		]

		log(
			arr.sort(
				compare({
					numeric: true,
					by: 1,
				}),
			),
		)

		const expected = [
			[0, 1, 0],
			[0, 2, 0],
			[0, 3, 0],
		]

		expect(arr).toStrictEqual(expected)
	})

	test('sort by index - numeric - descending', () => {
		const arr = [
			[0, 3, 0],
			[0, 1, 0],
			[0, 2, 0],
		]

		log(
			arr.sort(
				compare({
					numeric: true,
					descending: true,
					by: 1,
				}),
			),
		)

		const expected = [
			[0, 3, 0],
			[0, 2, 0],
			[0, 1, 0],
		]

		expect(arr).toStrictEqual(expected)
	})

	test('sort by index - alpha - ascending', () => {
		const arr = [
			['0', '3', '0'],
			['0', '1', '0'],
			['0', '2', '0'],
		]

		log(
			arr.sort(
				compare({
					by: 1,
				}),
			),
		)

		const expected = [
			['0', '1', '0'],
			['0', '2', '0'],
			['0', '3', '0'],
		]

		expect(arr).toStrictEqual(expected)
	})

	test('sort by index - alpha - descending', () => {
		const arr = [
			['0', '3', '0'],
			['0', '1', '0'],
			['0', '2', '0'],
		]

		log(
			arr.sort(
				compare({
					descending: true,
					by: 1,
				}),
			),
		)

		const expected = [
			['0', '3', '0'],
			['0', '2', '0'],
			['0', '1', '0'],
		]

		expect(arr).toStrictEqual(expected)
	})

	test('sort by key - shallow - numeric - ascending', () => {
		const arr = [
			{ a: 0, b: 0 },
			{ a: 0, b: 2 },
			{ a: 0, b: 1 },
		]

		log(
			arr.sort(
				compare({
					numeric: true,
					by: 'b',
				}),
			),
		)

		const expected = [
			{ a: 0, b: 0 },
			{ a: 0, b: 1 },
			{ a: 0, b: 2 },
		]

		expect(arr).toStrictEqual(expected)
	})

	test('sort by key - shallow - numeric - descending', () => {
		const arr = [
			{ a: 0, b: 0 },
			{ a: 0, b: 2 },
			{ a: 0, b: 1 },
		]

		log(
			arr.sort(
				compare({
					numeric: true,
					descending: true,
					by: 'b',
				}),
			),
		)

		const expected = [
			{ a: 0, b: 2 },
			{ a: 0, b: 1 },
			{ a: 0, b: 0 },
		]

		expect(arr).toStrictEqual(expected)
	})

	test('sort by key - deep - numeric - ascending', () => {
		const arr = [{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 0 } }]

		log(
			arr.sort(
				compare({
					numeric: true,
					by: 'a.b',
				}),
			),
		)

		const expected = [{ a: { b: 0 } }, { a: { b: 1 } }, { a: { b: 2 } }]

		expect(arr).toStrictEqual(expected)
	})

	test('sort by key - deep - numeric - descending', () => {
		const arr = [{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 0 } }]

		log(
			arr.sort(
				compare({
					numeric: true,
					descending: true,
					by: 'a.b',
				}),
			),
		)

		const expected = [{ a: { b: 2 } }, { a: { b: 1 } }, { a: { b: 0 } }]

		expect(arr).toStrictEqual(expected)
	})

	test('sort by key - shallow - alpha - ascending', () => {
		const arr = [
			{ a: 0, b: 'a' },
			{ a: 0, b: 'c' },
			{ a: 0, b: 'b' },
		]

		log(
			arr.sort(
				compare({
					by: 'b',
				}),
			),
		)

		const expected = [
			{ a: 0, b: 'a' },
			{ a: 0, b: 'b' },
			{ a: 0, b: 'c' },
		]

		expect(arr).toStrictEqual(expected)
	})

	test('sort by key - shallow - alpha - descending', () => {
		const arr = [
			{ a: 0, b: 'a' },
			{ a: 0, b: 'c' },
			{ a: 0, b: 'b' },
		]

		log(
			arr.sort(
				compare({
					descending: true,
					by: 'b',
				}),
			),
		)

		const expected = [
			{ a: 0, b: 'c' },
			{ a: 0, b: 'b' },
			{ a: 0, b: 'a' },
		]

		expect(arr).toStrictEqual(expected)
	})

	test('sort by key - deep - alpha - ascending', () => {
		const arr = [{ a: { b: 'b' } }, { a: { b: 'c' } }, { a: { b: 'a' } }]

		log(
			arr.sort(
				compare({
					by: 'a.b',
				}),
			),
		)

		const expected = [{ a: { b: 'a' } }, { a: { b: 'b' } }, { a: { b: 'c' } }]

		expect(arr).toStrictEqual(expected)
	})

	test('sort by key - deep - alpha - descending', () => {
		const arr = [{ a: { b: 'b' } }, { a: { b: 'c' } }, { a: { b: 'a' } }]

		log(
			arr.sort(
				compare({
					descending: true,
					by: 'a.b',
				}),
			),
		)

		const expected = [{ a: { b: 'c' } }, { a: { b: 'b' } }, { a: { b: 'a' } }]

		expect(arr).toStrictEqual(expected)
	})

	const getArrNumericArrays = () => [
		[1, 5, 2],
		[2],
		[20],
		[2, 3, 1],
		[3, 2],
		[1, [2], [3, 3, 1], [1], [2, 2, 1]],
		[1],
		[3, 3],
		[1, [2], [2, 3, 1], [1], [2, 2, 1]],
		[2, 2, 1],
	]

	test('sort array of numeric arrays recursively - default order', () => {
		const arr = getArrNumericArrays()

		log(
			arr.sort(
				compare({
					numeric: true,
					arrays: true,
				}),
			),
		)

		const expected = [
			[1],
			[1, 5, 2],
			[1, [2], [2, 3, 1], [1], [2, 2, 1]],
			[1, [2], [3, 3, 1], [1], [2, 2, 1]],
			[2],
			[2, 2, 1],
			[2, 3, 1],
			[3, 2],
			[3, 3],
			[20],
		]

		expect(arr).toStrictEqual(expected)
	})

	test('sort array of numeric arrays recursively - ascending order', () => {
		const arr = getArrNumericArrays()

		log(
			arr.sort(
				compare({
					numeric: true,
					arrays: true,
					descending: false,
				}),
			),
		)

		const expected = [
			[1],
			[1, 5, 2],
			[1, [2], [2, 3, 1], [1], [2, 2, 1]],
			[1, [2], [3, 3, 1], [1], [2, 2, 1]],
			[2],
			[2, 2, 1],
			[2, 3, 1],
			[3, 2],
			[3, 3],
			[20],
		]

		expect(arr).toStrictEqual(expected)
	})

	test('sort array of numeric arrays recursively - descending order', () => {
		const arr = getArrNumericArrays()

		log(
			arr.sort(
				compare({
					numeric: true,
					arrays: true,
					descending: true,
				}),
			),
		)

		const expected = [
			[20],
			[3, 3],
			[3, 2],
			[2, 3, 1],
			[2, 2, 1],
			[2],
			[1, [2], [3, 3, 1], [1], [2, 2, 1]],
			[1, [2], [2, 3, 1], [1], [2, 2, 1]],
			[1, 5, 2],
			[1],
		]

		expect(arr).toStrictEqual(expected)
	})

	const getArrStringArrays = () => [
		['1', '5', '2'],
		['2'],
		['2', '2', '1'],
		['1', ['2'], ['3', '3', '1', ['1'], ['2', '3', '1']]],
		['1', '20'],
		['1', '3'],
		['1', '2'],
		['1', ['2'], ['2', '3', '1', ['1'], ['2', '2', '1']]],
	]

	test('sort array of string arrays recursively - default order', () => {
		const arr = getArrStringArrays()

		log(
			arr.sort(
				compare({
					arrays: true,
				}),
			),
		)

		const expected = [
			['1', '2'],
			['1', '20'],
			['1', '3'],
			['1', '5', '2'],
			['1', ['2'], ['2', '3', '1', ['1'], ['2', '2', '1']]],
			['1', ['2'], ['3', '3', '1', ['1'], ['2', '3', '1']]],
			['2'],
			['2', '2', '1'],
		]

		expect(arr).toStrictEqual(expected)
	})

	test('sort array of string arrays recursively - ascending order', () => {
		const arr = getArrStringArrays()

		log(
			arr.sort(
				compare({
					arrays: true,
					descending: false,
				}),
			),
		)

		const expected = [
			['1', '2'],
			['1', '20'],
			['1', '3'],
			['1', '5', '2'],
			['1', ['2'], ['2', '3', '1', ['1'], ['2', '2', '1']]],
			['1', ['2'], ['3', '3', '1', ['1'], ['2', '3', '1']]],
			['2'],
			['2', '2', '1'],
		]

		expect(arr).toStrictEqual(expected)
	})

	test('sort array of string arrays recursively - descending order', () => {
		const arr = getArrStringArrays()

		log(
			arr.sort(
				compare({
					arrays: true,
					descending: true,
				}),
			),
		)

		const expected = [
			['2', '2', '1'],
			['2'],
			['1', ['2'], ['3', '3', '1', ['1'], ['2', '3', '1']]],
			['1', ['2'], ['2', '3', '1', ['1'], ['2', '2', '1']]],
			['1', '5', '2'],
			['1', '3'],
			['1', '20'],
			['1', '2'],
		]

		expect(arr).toStrictEqual(expected)
	})
	test('examples', () => {
		let arr, expected

		/**
		 * DATA: STRINGS
		 * --------------
		 */
		arr = ['5', '2', '4', '30', '1', '3']

		/**
		 * SORT ALPHABETICALLY BY DEFAULT
		 * ------------------------------
		 */
		arr.sort(compare())

		expected = ['1', '2', '3', '30', '4', '5']

		expect(arr).toStrictEqual(expected)

		/**
		 * DATA: NUMERIC VALUES
		 * ----------------------
		 */
		arr = [5, 2, 4, 30, 1, 3]

		/**
		 * SORT NUMERICALLY
		 * ----------------
		 */

		arr.sort(
			compare({
				numeric: true,
			}),
		)

		expected = [1, 2, 3, 4, 5, 30]

		expect(arr).toStrictEqual(expected)

		/**
		 * SORT DESCENDING
		 * ---------------
		 */
		arr.sort(
			compare({
				numeric: true,
				descending: true,
			}),
		)

		expected = [30, 5, 4, 3, 2, 1]

		expect(arr).toStrictEqual(expected)

		/**
		 * DATA: PERSON OBJECTS
		 * --------------------
		 */
		arr = [
			{ name: 'john', age: 4 },
			{ name: 'bill', age: 8 },
		]

		/**
		 * SORT OBJECTS BY PROPERTY
		 * ------------------------
		 */
		arr.sort(
			compare({
				by: 'name',
			}),
		)

		expected = [
			{ name: 'bill', age: 8 },
			{ name: 'john', age: 4 },
		]

		expect(arr).toStrictEqual(expected)

		arr.sort(
			compare({
				numeric: true,
				by: 'age',
			}),
		)

		expected = [
			{ name: 'john', age: 4 },
			{ name: 'bill', age: 8 },
		]

		expect(arr).toStrictEqual(expected)

		/**
		 * DATA: PERSON OBJECTS WITH NESTED NAME OBJECTS
		 * ---------------------------------------------
		 */
		arr = [
			{ id: 0, name: { first: 'snoop', last: 'doggy' } },
			{ id: 1, name: { first: 'kurt', last: 'qobain' } },
		]

		/**
		 * SORT OBJECTS BY NESTED PROPERTY WITH DOT NOTATION
		 * -------------------------------------------------
		 */
		arr.sort(
			compare({
				by: 'name.first',
			}),
		)

		expected = [
			{ id: 1, name: { first: 'kurt', last: 'qobain' } },
			{ id: 0, name: { first: 'snoop', last: 'doggy' } },
		]

		expect(arr).toStrictEqual(expected)

		arr.sort(
			compare({
				by: 'name.last',
			}),
		)

		expected = [
			{ id: 0, name: { first: 'snoop', last: 'doggy' } },
			{ id: 1, name: { first: 'kurt', last: 'qobain' } },
		]

		expect(arr).toStrictEqual(expected)

		/**
		 * DATA: STRING DIRECTORY PATHS SPLIT IN ARRAYS
		 * --------------------------------------------
		 */

		arr = [
			['repo', 'src', 'compare.js'],
			['repo', 'docs', 'index.html'],
		]

		/**
		 * SORT BY ARRAY INDEX
		 * -------------------
		 */
		arr.sort(
			compare({
				by: 2,
			}),
		)

		expected = [
			['repo', 'src', 'compare.js'],
			['repo', 'docs', 'index.html'],
		]

		expect(arr).toStrictEqual(expected)

		arr.sort(
			compare({
				by: 1,
			}),
		)

		expected = [
			['repo', 'docs', 'index.html'],
			['repo', 'src', 'compare.js'],
		]

		expect(arr).toStrictEqual(expected)

		/**
		 * DATA: DIRECTORY PATHS ARRAYS WITH SUB-ARRAYS
		 * --------------------------------------------
		 */

		arr = [
			['repo', 'src', ['compare', 'json']],
			['repo', 'src', ['compare', 'ts']],
			['repo', 'src', ['compare', 'js']],
		]

		/**
		 * SORT ARRAYS AND SUB-ARRAYS RECURSIVELY
		 * ------------------------------------
		 */
		arr.sort(
			compare({
				arrays: true,
			}),
		)

		expected = [
			['repo', 'src', ['compare', 'js']],
			['repo', 'src', ['compare', 'json']],
			['repo', 'src', ['compare', 'ts']],
		]

		expect(arr).toStrictEqual(expected)

		/**
		 * DATA: IP ADDRESSES AS ARRAYS
		 * ----------------------------
		 */

		arr = [
			[192, 168, 0, 1],
			[192, 168, 0, 101],
			[172, 0, 0, 1],
		]

		/**
		 * SORT NUMERIC IP-ADDRESSES AS ARRAYS
		 * -----------------------------------
		 */

		arr.sort(
			compare({
				numeric: true,
				arrays: true,
			}),
		)

		expected = [
			[172, 0, 0, 1],
			[192, 168, 0, 1],
			[192, 168, 0, 101],
		]

		expect(arr).toStrictEqual(expected)

		/**
		 * DATA: USER CLASS INSTANCES
		 * --------------------------
		 */
		class User {
			constructor(firstName, lastName) {
				this.firstName = firstName
				this.lastName = lastName
			}
			get fullName() {
				return this.firstName + ' ' + this.lastName
			}
		}

		arr = [
			new User('john', 'doe'),
			new User('peter', 'wick'),
			new User('peter', 'johnson'),
			new User('les', 'paul'),
		]

		/**
		 * SORT BY GETTER-FUNCTION
		 * ------------------------
		 */

		arr.sort(
			compare({
				by: (user) => {
					return user.fullName
				},
			}),
		)

		expected = [
			new User('john', 'doe'),
			new User('les', 'paul'),
			new User('peter', 'johnson'),
			new User('peter', 'wick'),
		]

		expect(arr).toStrictEqual(expected)
	})
})
