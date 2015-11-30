#!/bin/bash
[ ! node_modules/karma/bin/karma ] && npm install
node_modules/karma/bin/karma $*