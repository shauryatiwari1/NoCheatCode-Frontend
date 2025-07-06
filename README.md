# NoCheatCode (NCC) Frontend Repository
*"Guidance over answers. Growth over shortcuts."*

NoCheatCode (NCC) is a next-generation programming platform built to prevent solution copying and encourage real learning. This is a SaaS Platform where users can come and get real learning and build Problem-Solving Skills. AI Assistant remembers your previous coding patterns, gets personalized and suggest improvements.

---

## What is NoCheatCode?

NCC is a cheat-resistant platform where you can:
- Solve curated DSA problems (managed via REST APIs and persisted in a relational database).
- Receive multi-level contextual AI-generated responses instead of direct answers (powered by Google Gemini).
- Submit code and get real-time feedback via Judge0 integration.
- Get contextual help based on the code you are currently writing and your previous coding patterns/behavior.

**[Live Link](https://codesaas.netlify.app/)**

### The core belief:
*Learning is most effective when you struggle, think, and get guided nudges — not copy-paste solutions.*

---

## What Makes NCC Different?

### AI-Guided Learning, Not Code Delivery
#### 3 Levels of Hinting:
- **Level 1:** Approach / Thought Process
- **Level 2:** Algorithm Breakdown
- **Level 3:** Edge Case / Pitfall Handling

#### Chat Feature:
- Talk about your program/approaches or anything related to programming.

### Cheat-Resistant By Design
- No full solution exposure.
- Hints adapt to the user’s real-time code progress.
- AI also has context of users previous coding patterns, to make it better and more personalized with time, your Assistant adapts with your coding style and suggests improvements.
- Discourages mindless solution hunting.

### Modular, Scalable Architecture
- Backend built with Java 17+, Spring Boot, and JPA/Hibernate.
- RESTful APIs for problem management, test cases, AI hinting, and authentication.
- PostgreSQL (or compatible RDBMS) for data persistence.
- Judge0 integration for code execution and real-time submission checking.
- Environment-based configuration (dev, local, test) and Flyway for database migrations.
- Dockerfile included for containerized deployment.

### Modern, Performant Tech Stack
- **Backend:** Spring Boot (REST APIs, modular structure).
- **Frontend:** React components.
- **Security:** JWT authentication, RBAC (Role-Based Access Control).
- **DevOps:** Docker-ready, environment variable management.

### Security-First Approach, with Performance
- JWT authentication with secure storage.
- XSS-protected code inputs and hint handling.
- Input Sanitization for safety.
- RBAC structure for user roles and permissions.

---

## The Vision
NCC isn’t just another coding platform. It’s a mindset shift.

NoCheatCode empowers learners to struggle, think, and build lasting problem-solving muscles.

It’s a space where copying isn’t possible, and learning isn’t optional.

---

## Tech
- Full-stack system design (Spring Boot backend, React frontend)
- REST APIs with modular separation (controllers, services, repositories, DTOs)
- AI integration in real-world workflows
- Live code submission and auto-judging system (Judge0)
- Secure token-based authentication (JWT)
- Multi-user concurrency handling
- Modern DevOps-ready structure (Docker, migrations, environment configs)

---

## Why This Project Matters
NoCheatCode proves that you can combine competitive programming, problem solving, AI, and cheat-resistance into a powerful, scalable SaaS product.

It’s an original build that challenges the status quo.

---

## Workspace Features & Specs:
- Java 17+, Spring Boot, Maven
- JPA/Hibernate entities (e.g., ProblemTestCase)
- REST controllers, services, repositories, security, AI helper modules
- PostgreSQL
- JWT authentication, RBAC
- Judge0 integration for code execution
- Google Gemini API for AI Chat
- Environment-based configuration (application.yml, etc.)
- Dockerfile for deployment
