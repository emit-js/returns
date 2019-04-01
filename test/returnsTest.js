/* global Promise */
/* eslint-env jest */

test("returns", function() {
  var dot = require("dot-event")()

  require("@dot-event/log")(dot)
  require("@dot-event/type")(dot)
  require("../")(dot)

  dot("returns", "test", { arg: "object" })

  dot.any("test", function() {
    return true
  })

  expect(dot.test()).toBe(true)
})

test("returns (async)", function() {
  var dot = require("dot-event")()

  require("@dot-event/log")(dot)
  require("@dot-event/type")(dot)
  require("../")(dot)

  dot("returns", "test", { async: "object" })

  dot.any("test", function() {
    return Promise.resolve(true)
  })

  return dot.test()
})
