const presets = [
  '@babel/preset-env',
  '@babel/preset-react'
];

const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-syntax-dynamic-import',
  ['import', {
    libraryName: 'antd',
    style: 'css'
  }]
];

module.exports = {
  presets,
  plugins
};