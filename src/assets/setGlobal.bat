@echo off
set global_path=%1
echo Using global_path: %global_path%
reg add HKCU\Environment /v Path /t REG_EXPAND_SZ /d "%global_path%;%path%"