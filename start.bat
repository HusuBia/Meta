@echo off
echo 🔄 Oprire si stergere vechi containere/poduri...
podman-compose down

echo 🚀 Pornire aplicatie cu podman-compose...
podman-compose up --build -d

echo ⏳ Asteptam 20 de secunde pentru ca MySQL si Spring Boot sa porneasca...
timeout /t 20 > nul

echo ✅ Aplicatia este pornita!
echo 🖥️  Frontend (Next.js): http://localhost:3000
echo 🔧  Backend (Spring Boot): http://localhost:8080
echo 🗃️  MySQL: localhost:3306 (user: myuser, pass: mypassword)

pause
