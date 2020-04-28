import compare from '../src/arr-sort-comparator'

let arr

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
//=> ['1', '2', '3', '30', '4', '5']

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
//=> [1, 2, 3, 4, 5, 30]

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
//=> [30, 5, 4, 3, 2, 1]

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

/* =>
	[
		{ name: 'bill', age: 8 },
		{ name: 'john', age: 4 },
	]
*/

arr.sort(
	compare({
		numeric: true,
		by: 'age',
	}),
)

/* =>
	[
		{ name: 'john', age: 4 },
		{ name: 'bill', age: 8 },
	]
*/

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

/* =>
	[
		{ id: 1, name: { first: 'kurt', last: 'qobain' } },
		{ id: 0, name: { first: 'snoop', last: 'doggy' } },
	]
*/

arr.sort(
	compare({
		by: 'name.last',
	}),
)

/* =>
	[
		{ id: 0, name: { first: 'snoop', last: 'doggy' } },
		{ id: 1, name: { first: 'kurt', last: 'qobain' } },
	]
*/

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

/* =>
	[
		['repo', 'src', 'compare.js'],
		['repo', 'docs', 'index.html'],
	]
*/

arr.sort(
	compare({
		by: 1,
	}),
)

/* =>
	[
		['repo', 'docs', 'index.html' ],
		['repo', 'src', 'compare.js'],
	]
*/

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

/* =>
	[
		['repo', 'src', ['compare', 'js']],
		['repo', 'src', ['compare', 'json']],
		['repo', 'src', ['compare', 'ts']],
	]
*/

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

/* =>
	[
		[172, 0, 0, 1],
		[192, 168, 0, 1],
		[192, 168, 0, 101],
	]
*/

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

/* =>
	[
		{ firstName: 'john', lastName: 'doe'},
		{ firstName: 'les', lastName: 'paul'},
		{ firstName: 'peter', lastName: 'johnson'},
		{ firstName: 'peter', lastName: 'wick'},
	]
*/
