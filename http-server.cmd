@echo off
if not exist node_modules\.bin\http-server call npm install
node_modules\.bin\http-server . -o -a localhost -p 8000 