module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          hooks: './src/hooks',
          constants: './src/constants',
          assets: './src/assets',
          components: './src/components',
          pages: './src/pages',
          utils: './src/utils',
          atoms: './src/atoms',
        },
      },
    ],
  ],
};
