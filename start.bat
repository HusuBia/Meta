@echo off
echo 🔄 Pornire servicii cu podman-compose...
podman-compose up -d

echo ⏳ Asteptam ca MySQL sa porneasca complet...
timeout /t 20 > nul

echo ✅ Totul a fost pornit!
pause
