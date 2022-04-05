module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@hooks': './src/hooks',
          '@constants': './src/constants',
          '@images': './src/assets/images',
          '@styles': './src/assets/styles',
          '@components': './src/components',
        },
      },
    ],
  ],
};
