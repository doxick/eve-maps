import Path from 'path'
import Http from 'http'

import Express from 'express'
import ReactEngine from 'express-react-views'
import Morgan from 'morgan'

import bindMiddlewares from './middlewares'
import RootController from './controllers'

const app = Express()

app.set('port', process.env.PORT || 3002)
app.set('trust proxy', 'loopback')

/* Predefined directories */
app.set('assets_path', Path.join(__dirname, '../dist/assets/'))

/* React SSR */
app.set('views', Path.join(__dirname, '../client'))
app.set('view engine', 'js')
app.engine('js', ReactEngine.createEngine({
  transformViews: false
}))

/* Static file serving */
app.use('/assets', Express.static(app.get('assets_path')))

/* Adds logging */
if (process.env.NODE_ENV === 'development') {
  app.use(Morgan('combined'))
}

/* Middlewares */
bindMiddlewares(app)

/* base routes */
app.use(RootController)

/* Actual server */

const server = Http.createServer(app)

server.listen(app.get('port'))

server.on('error', (error) => {
  console.error(error)
})

server.on('listening', () => {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`
  console.log(`Listening on ${bind}`)
})
