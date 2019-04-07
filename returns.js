/*prettier-ignore*/
"use strict"

module.exports = function(emit) {
  if (emit.returns) {
    return
  }

  emit.state.returns = {}

  emit.any("returns", returns)
}

function returns(arg, prop, emit) {
  emit.state.returns[prop[0]] = arg
  emit.any(prop[0], setValueFn)
}

function setValueFn(arg, prop, emit, signal) {
  signal.valueFn = valueFn
}

function valueFn(arg, prop, emit, signal) {
  var bind = { emit: emit, event: signal.event, prop: prop }

  if (signal.valuePromise) {
    bind.async = true
    return signal.valuePromise.then(checkTypes.bind(bind))
  } else {
    return checkTypes.call(bind, signal.value)
  }
}

function checkTypes(check) {
  var async = this.async,
    emit = this.emit,
    event = this.event,
    prop = this.prop

  var type = emit.state.returns[event]
  type = async ? type.async : type

  if (
    type &&
    !emit.typeCheck({ check: check, type: type })
  ) {
    emit("log", "warn", prop, {
      event: event,
      message:
        "Failed return type check: wanted " +
        type +
        ", received " +
        emit.type(check),
    })
  }

  return check
}
