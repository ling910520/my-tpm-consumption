// // next.config.js
// const withSass = require('@zeit/next-sass')
// module.exports = withSass({
//   /* config options here */
// })


// const withCSS = require('@zeit/next-css')
// module.exports = withCSS({
//   /* config options here */
// })


const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(withSass());