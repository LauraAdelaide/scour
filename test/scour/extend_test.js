'use strict'

const test = require('tape')
const scour = require('../../src/scour')
var data, result, list

test('.extend()', (t) => {
  data = { a: { bb: 1 } }
  result = scour(data).extend({ c: 2 })
  t.deepEqual(
    result.value,
    { a: { bb: 1 }, c: 2 },
    'works')

  data = { a: { b: { c: 1 } } }
  result = scour(data).go('a').extend({ b: 2 })
  t.deepEqual(
    result.value,
    { b: 2 },
    'works in a scope')

  data = { a: { b: { c: 1 } } }
  result = scour(data).go('a').extend({ b: 2 })
  t.deepEqual(
    result.root.value,
    { a: { b: 2 } },
    'spawns new root')

  data = { a: { b: 1 } }
  result = scour(data).extend({ a: { c: 2 } })
  t.deepEqual(
    result.value, { a: { c: 2 } },
    'overrides objects')

  data = { a: { b: 1 } }
  result = scour(data).extend({ c: { d: 2 } })
  t.deepEqual(
    result.go('c').get('d'),
    2,
    'is chainable')

  t.deepEqual(
    scour('hello').extend({ a: 1 }),
    undefined,
    'fails on non objects')

  t.deepEqual(
    scour([]).extend({ a: 1 }),
    undefined,
    'fails on arrays')

  t.deepEqual(
    scour({}).extend('huh'),
    undefined,
    'fails on non-objects being passed as arguments')

  data = { a: { b: 1 } }
  result = scour(data).extend({ c: { d: 2 } })
  t.deepEqual(
    result.root,
    result,
    'works in a root')

  t.end()
})