const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/api1',
    createProxyMiddleware({
      target: 'https://k7b204.p.ssafy.io/api1/',
      changeOrigin: true,
    }),
  );
};

module.exports = app => {
  app.use(
    '/api2',
    createProxyMiddleware({
      target: 'https://k7b204.p.ssafy.io/api2/',
      changeOrigin: true,
    }),
  );
};

// module.exports = app => {
//   app.use(
//     '/ws',
//     createProxyMiddleware({
//       target: 'wss://k7b204.p.ssafy.io:8080/ws',
//       ws: true,
//       changeOrigin: true,
//     }),
//   );
// };
