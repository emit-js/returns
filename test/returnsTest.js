/* global Promise */
/* eslint-env jest */

test("returns", function() {
  var emit = require("@emit-js/emit")()

  require("@emit-js/log")(emit)
  require("@emit-js/type")(emit)
  require("../")(emit)

  emit("returns", "test", "object")

  emit.any("test", function() {
    return true
  })

  expect(emit.test()).toBe(true)
})

test("returns (async)", function() {
  var emit = require("@emit-js/emit")()

  require("@emit-js/log")(emit)
  require("@emit-js/type")(emit)
  require("../")(emit)

  emit("returns", "test", "object")

  emit.any("test", function() {
    return Promise.resolve(true)
  })

  return emit.test()
})
