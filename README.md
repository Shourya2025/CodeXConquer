🕒 Time Tracking System (CodeXConquer)

A backend-focused **Time Tracking System** built using **Spring Boot** as part of the CodeXConquer internship project.
This application lays the foundation for employee/candidate time tracking, authentication, and productivity logging.

---

## 🚀 Project Status

**Current Stage:** Backend Foundation Completed ✅
**Frontend:** To be implemented later
**Authentication:** In progress (custom auth coming next)

---

## 🛠️ Tech Stack

* **Java** (OpenJDK 25)
* **Spring Boot 4**
* **Spring Web**
* **Spring Data JPA**
* **Spring Security**
* **H2 Database (In-memory)**
* **Hibernate ORM**
* **Maven**
* **Lombok**

---

## 📦 Features Implemented (Till Now)

### ✅ Backend Setup

* Spring Boot project initialized and configured
* Maven-based project structure
* Embedded Tomcat server running on port `8080`

### ✅ Database Integration

* H2 in-memory database configured
* JPA & Hibernate enabled
* Automatic table creation using entity mappings
* H2 Console enabled for debugging

### ✅ User Management (Registration)

* User Entity created with fields:

  * Full Name
  * Email (unique)
  * Password
  * Role
* REST API for **User Registration**
* Input validation using `@Valid`, `@NotBlank`, `@Email`
* Duplicate email check implemented

### ✅ Security Configuration

* Spring Security integrated
* CSRF disabled for REST APIs
* Custom `SecurityConfig` using `SecurityFilterChain`
* All endpoints temporarily permitted for development
* Default Spring Security login page disabled

### ✅ REST API

* Health check endpoint (`/test`)
* Authentication endpoint base: `/api/auth`

---

## 📡 API Endpoints

### 🔹 Test Endpoint

```
GET /test
```

**Response:**

```
Time Tracking System is running!
```

### 🔹 User Registration

```
POST /api/auth/register
```

**Request Body (JSON):**

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "id": 1,
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "CANDIDATE"
}
```

> ⚠️ Note: Password encryption will be added in the next phase.

---

## 🗄️ H2 Database Access

* **URL:** `http://localhost:8080/h2-console`
* **JDBC URL:** `jdbc:h2:mem:timedb`
* **Username:** `sa`
* **Password:** *(empty)*

---

## 📁 Project Structure

```
com.codexconquer.timetracking
│
├── controller     → REST Controllers
├── service        → Business Logic
├── repository     → JPA Repositories
├── entity         → Database Entities
├── dto            → Request/Response DTOs
├── security       → Spring Security Configuration
└── config         → Application Configuration
```

---

## 🔮 Upcoming Features (Planned)

* 🔐 Password encryption using BCrypt
* 🔑 Custom login API (JWT-based)
* ⏱️ Punch In / Punch Out system
* 📊 Daily work-hour calculations
* 👤 Role-based access (Candidate / Admin)
* 📤 Reports & analytics
* 🌐 Frontend integration

---

## 👨‍💻 Author

**Shourya Pratap Singh Thakur**
Backend Developer | Java | Spring Boot
CodeXConquer Internship Project

---

## 📝 Note

This project is developed as part of an internship and is the intellectual property of **CodeXConquer**.
Only limited functionality may be showcased for academic or placement purposes.

---
