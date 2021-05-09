
const {electronMainConfig, electronPrelaodConfig, electronRendererConfig} = require('./webpack.common');
const {merge} = require('webpack-merge');

module.exports = [
  merge(
    electronMainConfig,
    {
      mode: 'production',
    }
  ),
  merge(
    electronPrelaodConfig,
    {
      mode: 'production'
    }
  ),
  merge(
    electronRendererConfig,
    {
      mode: 'production'
    }
  )
];
