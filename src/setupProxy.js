/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-08-21 16:42:56
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-08-21 16:44:13
 * @FilePath: /react-admin-demo/src/setupProxy.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const {
  createProxyMiddleware
} = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api',
      }
    })
  );
};
