const CracoLessPlugin = require('craco-less');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://swapi.dev',
        changeOrigin: true,
        secure: true,
        logLevel: 'debug',
      },
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
