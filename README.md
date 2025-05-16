# Next Step — AI-Powered Career Advisor

Next Step is a modern web application that helps users discover their career path or take meaningful steps toward advancing their professional life. Through a combination of AI, guided tools, and smart features, the platform supports users with career coaching, CV generation, interview preparation, and real-time job alerts.

---

## Technologies Used

![Next.js](https://img.shields.io/badge/Next.js-E2E8F0?style=flat-square&logo=next.js&logoColor=000000)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0EA5E9?style=flat-square&logo=tailwindcss&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=flat-square&logo=mysql&logoColor=white)
![OpenAI GPT-4](https://img.shields.io/badge/OpenAI-GPT--4-32a852?style=flat-square&logo=openai&logoColor=black)

---

## Key Features

* **Career Path Discovery** – Personalized guidance to help users understand their strengths and interests
* **CV Builder** – Automatically generate tailored, professional resumes
* **AI-Powered Interview Simulation** – Practice job interviews with dynamic AI-generated questions
* **Career Coach** – Talk to an AI coach or schedule sessions with human experts
* **Job Alerts** – Receive real-time notifications about relevant job openings
* **Secure Authentication** – Sign in via Google OAuth with JWT-based session management

---

## System Architecture

| Layer          | Technology             |
| -------------- | ---------------------- |
| Frontend       | Next.js, Tailwind CSS  |
| Backend        | Spring Boot, REST APIs |
| Authentication | Google OAuth 2.0, JWT  |
| AI Integration | OpenAI GPT-4 API       |
| Database       | MySQL                  |

---

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/next-step.git
cd next-step
```

### 2. Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

### 3. Backend Setup (Spring Boot)

Ensure you have **Java 17+** and **Maven** installed.

```bash
cd backend
./mvnw spring-boot:run
```

### 4. MySQL Configuration

Create the database:

```sql
CREATE DATABASE next_step_db;
```

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/next_step_db
spring.datasource.username=your_user
spring.datasource.password=your_password
```

---

## OpenAI Integration

The platform uses OpenAI’s GPT-4 API for:

* Career recommendations
* Interview question generation
* Resume summary and bullet point suggestions
* AI coach conversation logic

---

## Authentication Flow

1. Users log in via **Google OAuth 2.0**
2. Backend issues a **JWT** token
3. Token is used for all subsequent authenticated requests

---

## Project Structure

```
next-step/
│
├── frontend/             # Next.js + Tailwind application
│   ├── pages/            # Page routes
│   └── components/       # UI components
│
├── backend/              # Spring Boot service
│   ├── controller/       # REST endpoints
│   ├── service/          # Business logic
│   └── model/            # Entities and DTOs
```

---

## Roadmap

* User dashboard with activity insights
* Real-time job alert engine
* Exportable PDF resumes
* Persistent AI chat history
* Job board API integrations (LinkedIn, BestJobs, etc.)

---

## Contributing

We welcome contributions from the community. Please fork the repository, create a feature branch, and submit a pull request with detailed information about your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

