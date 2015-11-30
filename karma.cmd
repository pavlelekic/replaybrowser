@echo off
if not exist node_modules\karma\bin\karma call npm install
node node_modules\karma\bin\karma %*