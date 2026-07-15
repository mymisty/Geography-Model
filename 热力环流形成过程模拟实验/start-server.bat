@echo off
cd /d "%~dp0"

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  set "PYTHON_CMD=python"
) else (
  where py >nul 2>nul
  if %ERRORLEVEL% EQU 0 (
    set "PYTHON_CMD=py -3"
  ) else (
    echo 未找到 Python。请先安装 Python，或使用 VS Code Live Server 打开本文件夹。
    pause
    exit /b 1
  )
)

echo.
echo 正在启动热力环流形成过程模拟实验...
%PYTHON_CMD% "%~dp0start-server.py"
pause
