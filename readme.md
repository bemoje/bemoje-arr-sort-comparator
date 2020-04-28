# @bemoje/arr-sort-comparator

Create array comparator function.

#### Version

<span><a href="https://npmjs.org/@bemoje/arr-sort-comparator" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@bemoje/arr-sort-comparator" alt="NPM version" /></a></span>

#### Travis CI

<span><a href="https://npmjs.org/@bemoje/arr-sort-comparator" title="View this project on NPM"><img src="https://travis-ci.org/bemoje/bemoje-arr-sort-comparator.svg?branch=master" alt="dependencies" /></a></span>

#### Dependencies

<span><a href="https://npmjs.org/@bemoje/arr-sort-comparator" title="View this project on NPM"><img src="https://david-dm.org/bemoje/bemoje-arr-sort-comparator.svg" alt="dependencies" /></a></span>

#### Stats

<span><a href="https://npmjs.org/@bemoje/arr-sort-comparator" title="View this project on NPM"><img src="https://img.shields.io/npm/dt/@bemoje/arr-sort-comparator" alt="NPM downloads" /></a></span>
<span><a href="https://github.com/bemoje/bemoje-arr-sort-comparator/fork" title="Fork this project"><img src="https://img.shields.io/github/forks/bemoje/bemoje-arr-sort-comparator" alt="Forks" /></a></span>

#### Donate

<span><a href="https://www.buymeacoffee.com/bemoje" title="Donate to this project using Buy Me A Beer"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg?label=Buy me a beer!" alt="Buy Me A Beer donate button" /></a></span>
<span><a href="https://paypal.me/forstaaloen" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg?label=PayPal" alt="PayPal donate button" /></a></span>

## Installation

```sh
npm install @bemoje/arr-sort-comparator
npm install --save @bemoje/arr-sort-comparator
npm install --save-dev @bemoje/arr-sort-comparator
```

## Usage

```javascript

import compare from '@bemoje/arr-sort-comparator'

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

```


## Tests
Uses *Jest* to test module functionality. Run tests to get coverage details.

```bash
npm run test
```

## API
<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   -   [Parameters][1]

-   [comparator][2]

    -   [Parameters][3]

-   [getter][4]

    -   [Parameters][5]

-   [sortNumeric][6]

    -   [Parameters][7]

-   [sortAlpha][8]

    -   [Parameters][9]

## 

Create array comparator function.

##### Parameters

-   `options` **[object][10]?** 

    -   `options.numeric` **[boolean][11]** Sort numerically. Defaults to lexicographic/alphabetic sort. (optional, default `false`)

    -   `options.descending` **[boolean][11]** Sort in descending order. Defaults to ascending order. (optional, default `false`)

    -   `options.array` **[boolean][11]** Sort arrays. Nested arrays are also compared recursively. (optional, default `false`)

    -   `options.by` **([number][12] \| [string][13] \| [getter][14])** Sort by either array index, a callback(element): any - or by object keys with dot-notation support. (optional, default `undefined`)

Returns **[comparator][15]** 

## comparator

Type: [Function][16]

##### Parameters

-   `a` **any** The first value to compare

-   `b` **any** The second value to compare

Returns **[number][12]** A negative number if a > b, a positive number if a &lt; b, 0 otherwise.

## getter

Type: [Function][16]

##### Parameters

-   `a` **any** The value

Returns **any** The value to be compared

## sortNumeric

Numerical comparison of items. If the passed objects are not numbers, their .valueOf() methods are called to retrieve a numeric value representation of them.

##### Parameters

-   `a` **([number][12] \| [object][10])** First item to compare.

-   `b` **([number][12] \| [object][10])** Second item to compare.

Returns **[number][12]** A positive number if a > b, a negative number if a &lt; b, 0 otherwise.

## sortAlpha

Alphabetical comparison of items.

##### Parameters

-   `a` **([string][13] \| [object][10] \| [number][12])** First element to compare.

-   `b` **([string][13] \| [object][10] \| [number][12])** Second element to compare.

Returns **[number][12]** A positive number if a.toString() > b.toString(), a negative number if .toString() &lt; b.toString(), 0 otherwise.

[1]: #parameters

[2]: #comparator

[3]: #parameters-1

[4]: #getter

[5]: #parameters-2

[6]: #sortnumeric

[7]: #parameters-3

[8]: #sortalpha

[9]: #parameters-4

[10]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[11]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[12]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[13]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[14]: #getter

[15]: #comparator

[16]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function