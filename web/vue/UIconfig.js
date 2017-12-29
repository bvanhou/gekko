// This config is used in both the
// frontend as well as the web server.
// process.env.IP   || process.env.OPENSHIFT_NODEJS_IP 
// process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT
// see https://github.com/askmike/gekko/blob/stable/docs/installing_gekko_on_a_server.md
console.log(process.env);
module.exports = {
  headless: false,
    api: {
      host: '0.0.0.0',
      port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
      timeout: 120000 // 2 minutes
    },
    ui: {
      ssl: false,
      host: process.env.IP   || process.env.OPENSHIFT_NODEJS_IP,
      port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
      path: '/'
    },
    adapter: 'sqlite'
};



// if(typeof window === 'undefined')
//   module.exports = CONFIG;
// else
//   window.CONFIG = CONFIG;
