#!/bin/bash
[ ! node_modules/.bin/http-server ] && npm install
node_modules/.bin/http-server . -o -a localhost -p 8000 