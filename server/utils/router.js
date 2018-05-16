import {Router} from 'express'
import http from 'http'

const wrapAsync = fn => (...args) => {
  return Promise.resolve(fn(...args)).catch(args[2])
}
const methods = [...http.METHODS, 'param', 'all'];

const ExpressAsyncAwait = function(app) {
  methods.forEach(m => {
    let original = app[m.toLowerCase()]

    app[m.toLowerCase()] = function(...args) {
      const wrappedArgs = args.map(arg => {
        if (typeof arg === 'function') {
          return wrapAsync(arg);
        }

        return arg;
      });

      return original.call(app, ...wrappedArgs);
    }
  });

  return app
}



const router = function() {
  return ExpressAsyncAwait(Router())
}
router.prototype = Object.create(Router.prototype)
router.prototype.constructor = router

export default router
