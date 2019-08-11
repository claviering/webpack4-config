const presets = [
  '@babel/preset-env'
];
const plugins = ['@babel/plugin-syntax-dynamic-import', [
  'component', {
    libraryName: 'element-ui',
    styleLibraryName: 'theme-chalk'
  }
]];

module.exports = {
  presets,
  plugins
};