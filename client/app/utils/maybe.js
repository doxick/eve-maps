function Maybe (value = null) {
  if (value instanceof Maybe) {
    return value
  }
  if (!(this instanceof Maybe)) {
    return new Maybe(value)
  }
  this.__value = value
}
Maybe.of = Maybe
Maybe.ofError = function (error) {
  let m = new Maybe()
  m.__error = error
  return m
}
Maybe.ofLoading = function () {
  let m = new Maybe()
  m.__loading = true
  return m
}

Maybe.prototype.isNothing = function () {
  return (this.__value === null || this.__value === undefined)
}
Maybe.prototype.hasError = function () {
  return Boolean(this.__error)
}
Maybe.prototype.isLoading = function () {
  return Boolean(this.__loading)
}

Maybe.prototype.map = function (fn = (value => value)) {
  if (this.isNothing()) {
    return this
  }
  return Maybe.of(fn(this.__value))
}
Maybe.prototype.bind = function (fn = (value => value)) {
  if (this.isNothing()) {
    return this.__value
  }
  return fn(this.__value)
}
Maybe.prototype.val = function () {
  return this.__value
}

export default Maybe
