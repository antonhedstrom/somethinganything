const { createProxyMiddleware } = require('http-proxy-middleware');

const config = require('../../config.js');

// https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://localhost:${config.PORT}`,
      changeOrigin: true,
    })
  );
};
