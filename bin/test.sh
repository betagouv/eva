#!/bin/bash -e

BUILD_CMD="npx webpack --progress --color --config webpack.config-test.js"
MOCHA_OPTION="--require ./jsdom --colors";
if [ "$1" = "--watch" ]
then
  $BUILD_CMD --mode development --watch &
  MOCHA_OPTION="$MOCHA_OPTION --watch";
else
  $BUILD_CMD --mode production
fi

npx mocha $MOCHA_OPTION tests_build/testBundle.js
