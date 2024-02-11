@echo off
setlocal
echo Checking for Anaconda3 in path...
set global_path=%1

@REM reg query HKCU\Environment /v Path
FOR /F "tokens=*" %%a IN ('where conda') DO (
   echo %%a "666"
)
endlocal
