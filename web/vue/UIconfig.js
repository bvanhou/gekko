// This config is used in both the
// frontend as well as the web server.

// see https://github.com/askmike/gekko/blob/stable/docs/installing_gekko_on_a_server.md

const CONFIG = {
  headless: false,
  api: {
    host: process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    timeout: 120000 // 2 minutes
  },
  ui: {
    ssl: false,
    host: process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    path: '/'
  },
  adapter: 'sqlite'
}

if(typeof window === 'undefined')
  module.exports = CONFIG;
else
  window.CONFIG = CONFIG;
