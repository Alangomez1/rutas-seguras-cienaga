@echo off
title Subir RUTAS SEGURAS a GitHub
echo =======================================================
echo    SUBIENDO PROYECTO A GITHUB (Alangomez1)
echo =======================================================
cd /d "%~dp0"
echo Carpeta actual: %cd%
echo.
echo Ejecutando: git push -u origin main
git push -u origin main
echo.
echo =======================================================
if %ERRORLEVEL% EQU 0 (
    echo  LISTO! Tu proyecto se subio con exito a GitHub.
    echo  Ahora ya puedes ir a Render.com y conectarlo.
) else (
    echo  Hubo un detalle. Si te pidio iniciar sesion, completa el acceso en tu navegador.
)
echo =======================================================
pause

