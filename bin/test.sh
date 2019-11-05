#!/bin/bash -e

BUILD_CMD="npx webpack --progress --color --config webpack.config-test.js"
MOCHA_OPTION="--require ./jsdom --colors";

BUILD_MODE="production"

while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -w|--watch)
      BUILD_MODE="watch"
      MOCHA_OPTION="$MOCHA_OPTION --watch";
      shift # past argument
    ;;
    -r|--reporter)
      MOCHA_OPTION="$MOCHA_OPTION --reporter $2";
      shift # past argument
      shift # past value
    ;;
    *)    # unknown option
      echo "unknown argument $key -- ignored"
      shift # past argument
    ;;
esac
done

if [ $BUILD_MODE = "production" ]
then
  $BUILD_CMD --mode production
else
  $BUILD_CMD --mode development --watch &
fi


npx mocha $MOCHA_OPTION tests_build/testBundle.js
