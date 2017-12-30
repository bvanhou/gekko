// This config is used in both the
// frontend as well as the web server.
// see https://github.com/askmike/gekko/blob/stable/docs/installing_gekko_on_a_server.md

if(typeof window === 'undefined'){
  module.exports = {
    headless: true,
    api: {
      host: '127.0.0.1',
      port: 3000,
      timeout: 120000 // 2 minutes
    },
    ui: {
      ssl: false,
      host: 'localhost',
      port: 3000,
      path: '/'
    },
    adapter: 'sqlite'
  };
}else{
  window.CONFIG = {
    headless: true,
    api: {
      host: '0.0.0.0',
      port: 80,
      timeout: 120000 // 2 minutes
    },
    ui: {
      ssl: false,
      host: 'gekko-crypto.192.168.64.2.nip.io',
      port: 80,
      path: '/'
    },
    adapter: 'sqlite'
  };
}
