# DaveTask - Premium Task Management

DaveTask is a modern, premium task management web application built with a robust backend architecture and a highly responsive, aesthetic frontend.

## 🚀 Tech Stack Overview

### 🖥️ Frontend (React + Vite)
The frontend is initialized using **Vite** to ensure extremely fast Hot Module Replacement (HMR) and optimized production builds. 

**Core Dependencies & Tools:**
- **React 19** (`react`, `react-dom`): Utilizing the latest React features and concurrent rendering.
- **Vite** (`vite`, `@vitejs/plugin-react`): Next-generation frontend tooling for rapid development.
- **Tailwind CSS v3.4** (`tailwindcss`, `postcss`, `autoprefixer`): A utility-first CSS framework used for styling the entire application (Dark Mode, Animations, Responsive Design).
- **React Compiler** (`babel-plugin-react-compiler`): Automatic memoization and optimization for React components under the hood.
- **ESLint**: Standard linter setup combined with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` to ensure code quality and clean architecture.

### ⚙️ Backend (Spring Boot)
The backend is a robust RESTful API built with the latest **Spring Boot 4.0.7** running on **Java 21**.

**Core Dependencies & Tools:**
- **Spring WebMVC** (`spring-boot-starter-webmvc`): Foundation for building RESTful APIs and handling HTTP requests.
- **Spring Data JPA** (`spring-boot-starter-data-jpa`): For database interactions, repository management, and ORM (Object-Relational Mapping).
- **Spring Validation** (`spring-boot-starter-validation`): For strictly validating incoming API requests and Entity data.
- **Flyway Migration** (`spring-boot-starter-flyway`, `flyway-mysql`): For database version control and seamless schema tracking across environments.
- **MySQL Driver** (`mysql-connector-j`): JDBC driver required to connect to the MySQL database.
- **Lombok** (`lombok`): A crucial library used to significantly reduce boilerplate code (Getters, Setters, Constructors, Builders).
- **Spring Boot DevTools** (`spring-boot-devtools`): For rapid backend development, providing live reloads and auto-restarts.

## 📁 Project Structure

- `/frontend` - Contains the React Vite frontend application with Clean Architecture.
- `/backend` - Contains the Spring Boot Java backend API.
- `/firstlook` - Contains the initial vanilla HTML/Tailwind mockup/blueprint.

## 🛠️ Getting Started

### 1. Starting the Frontend
```bash
cd frontend
npm install
npm run dev
```
*Server will start at http://localhost:5173/*

### 2. Starting the Backend
Ensure you have an active MySQL server, configure your `application.properties`, and run:
```bash
cd backend
./mvnw spring-boot:run
```
*Server will start at http://localhost:8080/*
