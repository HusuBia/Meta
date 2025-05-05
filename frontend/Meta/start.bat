@echo off
echo Pornesc aplicatia React cu Podman...
podman-compose -f podman-compose.yml up --build -d
echo Aplicatia ruleaza pe http://localhost:3000
pause
