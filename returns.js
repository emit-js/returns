/*prettier-ignore*/
"use strict"

module.exports = function(dot) {
  if (dot.returns) {
    return
  }

  dot.state.returns = {}

  dot.any("returns", returns)
}

function returns(prop, arg, dot) {
  dot.state.returns[prop[0]] = arg
  dot.any(prop[0], setValueFn)
}

function setValueFn(prop, arg, dot, event, signal) {
  signal.valueFn = valueFn
}

function valueFn(prop, arg, dot, event, signal) {
  var bind = { dot: dot, event: event, prop: prop }

  if (signal.valuePromise) {
    bind.async = true
    return signal.valuePromise.then(checkTypes.bind(bind))
  } else {
    return checkTypes.call(bind, signal.value)
  }
}

function checkTypes(check) {
  var async = this.async,
    dot = this.dot,
    event = this.event,
    prop = this.prop

  var type = dot.state.returns[event]
  type = async ? type.async : type

  if (
    type &&
    !dot.typeCheck({ check: check, type: type })
  ) {
    dot("log", "warn", prop, {
      event: event,
      message:
        "Failed return type check: wanted " +
        type +
        ", received " +
        dot.type({ arg: check }),
    })
  }

  return check
}
