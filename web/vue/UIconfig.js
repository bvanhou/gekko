// This config is used in both the
// frontend as well as the web server.
// process.env.IP   || process.env.OPENSHIFT_NODEJS_IP 
// process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT
// see https://github.com/askmike/gekko/blob/stable/docs/installing_gekko_on_a_server.md


if(typeof window === 'undefined'){
   console.log('undefined window');
 
   module.exports =  {
    headless: true,
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
  
}else{
  console.log('defined window');
  
  window.CONFIG = {
    headless: true,
    api: {
      host: '0.0.0.0',
      port: 8080,
      timeout: 120000 // 2 minutes
    },
    ui: {
      ssl: false,
      host: '127.0.0.1',
      port: 8080,
      path: '/'
    },
    adapter: 'sqlite'
  };
  
}

