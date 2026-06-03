@echo off
title Portfolio Dev Server
cd /d "%~dp0"
echo ===================================================
echo   H.E. Tshibaza Kazi Christian - Systems Portfolio
echo   Starting Next.js Development Server...
echo ===================================================
echo.
npm run dev
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to start dev server. Make sure Node.js is installed.
    pause
)
