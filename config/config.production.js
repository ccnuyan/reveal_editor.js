export default {
  mode: 'development',
  port: 18000,
  serviceBase: {
    browser: '',
    electron: 'http://www.syncollege.com',
    native: 'http://www.syncollege.com',
  },
  cdnScripts: {
    jquery: {
      online: 'https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js',
      offline: 'window.$ = window.jQuery = require("./public/js/jquery.min.js");',
    },
  },
  cdnCss: {
    normalize: {
      online: '//cdn.bootcss.com/normalize/6.0.0/normalize.min.css', // embeded in indexMW.js
      offline: '/public/css/normalize.min.css', // embeded in indexMW.js
    },
  },
  localScripts: {
    semantic: '/semantic/dist/semantic.js',
  },
  localCss: {
    semantic: '/semantic/dist/semantic.css',
  },
  title: 'DEV MODE',
  pages: [
  ],
};
