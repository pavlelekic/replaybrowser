#!/bin/bash
[ ! node_modules/jshint/bin/jshint ] && npm install
node_modules/.bin/jshint . $*