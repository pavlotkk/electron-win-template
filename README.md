# electron-win-template
This is a template for Electron project with Webpack and Docker for building app installer for Windows OS.

## Demo app
The demo app shows how to run app with html template, js scripts, imported bootstrap css, images and IPC bridge.

## Project structure
* `build` - support file for builder (icon)
* `.webpack` - webpack output directory
* `dist` - production folder
* `src` - source code
* `webpack.*.js` - Webpack configuration

## Tricks
1. The `file-loader` didn't work as I expected - it injects script to `src` html attribute insted of new path to image, so I used `data-webpack-src` attribute to load images to `.webpack/assets` folder
2. No Webpack HMR (Hot Module Replacement), but `watch` is used. The problem was in customizing my own `preload.js` script to make a IPC bridge for security reasons.

### Etc
```shell
docker pull electronuserland/builder:wine

docker run --rm -ti \
 --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_|YARN_|NPM_|CI|CIRCLE|TRAVIS_TAG|TRAVIS|TRAVIS_REPO_|TRAVIS_BUILD_|TRAVIS_BRANCH|TRAVIS_PULL_REQUEST_|APPVEYOR_|CSC_|GH_|GITHUB_|BT_|AWS_|STRIP|BUILD_') \
 --env ELECTRON_CACHE="/root/.cache/electron" \
 --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
 -v ${PWD}:/project \
 -v ${PWD##*/}-node-modules:/project/node_modules \
 -v ~/.cache/electron:/root/.cache/electron \
 -v ~/.cache/electron-builder:/root/.cache/electron-builder \
 electronuserland/builder:wine \
 /bin/bash -c "yarn && yarn electron-build"
```