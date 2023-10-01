module.exports = {
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ 
        loader: "@svgr/webpack", 
        options: { 
          icon: true,
          typescript: true
        }, 
      }]
    });

    return config;
  }
}
