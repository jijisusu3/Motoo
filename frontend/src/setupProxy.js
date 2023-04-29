const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/api1',
    createProxyMiddleware({
      target: REACT_APP_API1,
      changeOrigin: true,
    }),
  );
};

module.exports = app => {
  app.use(
    '/api2',
    createProxyMiddleware({
      target: REACT_APP_API2,
      changeOrigin: true,
    }),
  );
};
