@ECHO OFF
if not exist node_modules\jshint\bin\jshint call npm install
node_modules\.bin\jshint . %*