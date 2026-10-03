@echo off
cd /d %~dp0
echo.
echo   个人网站: http://127.0.0.1:8090  (按 Ctrl+C 停止)
echo   修改个人信息请编辑 data.js
echo.
start "" http://127.0.0.1:8090
python -m http.server 8090 --bind 127.0.0.1
