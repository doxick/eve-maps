require('babel-register')({
  presets: [
    ['env', {
      targets: {
        node: 'current'
      }
    }],
    'react',
    'stage-0'
  ],
  cache: !(process.env.NODE_ENV === 'development'),
  plugins: [
    ['module-resolver', {
      alias: {
        server: './server',
        app: './client/app'
      }
    }]
  ]
})

module.exports = require('./server.js')
