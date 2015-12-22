'use strict'

const assign = require('object-assign')

/**
 * Sets a `keypath` into an `object` immutably.
 *
 *     data = { users: { bob: { name: 'john' } } }
 *     result = set(data, ['users', 'bob', 'name'], 'robert')
 */

module.exports = function set (object, keypath, value) {
  let results = {}
  let parents = {}

  for (let i = 0, len = keypath.length; i < len; i++) {
    if (i === 0) {
      parents[i] = object
    } else {
      parents[i] = parents[i - 1][keypath[i - 1]] || {}
    }
  }

  for (let i = keypath.length; i >= 0; i--) {
    if (!parents[i]) {
      results[i] = value
    } else {
      results[i] = assign({}, parents[i])
      results[i][keypath[i]] = results[i + 1]
    }
  }

  return results[0]
}