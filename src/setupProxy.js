const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://paper-api.alpaca.markets',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  );
};
