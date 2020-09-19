module.exports = {
    devServer: {
      proxy: {
        '/ajax': {
          target: 'https://m.maizuo.com',
        //   ws: true,
          changeOrigin: true
        },
        // '/foo': {
        //   target: '<other_url>'
        // }
      }
    }
  }