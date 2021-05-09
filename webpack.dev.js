const {electronMainConfig, electronPrelaodConfig, electronRendererConfig} = require('./webpack.common');
const {merge} = require('webpack-merge');

module.exports = [
  merge(
    electronMainConfig,
    {
      mode: 'development'
    }
  ),
  merge(
    electronPrelaodConfig,
    {
      mode: 'development'
    }
  ),
  merge(
    electronRendererConfig,
    {
      mode: 'development',
      watch: true,
    }
  )
];
