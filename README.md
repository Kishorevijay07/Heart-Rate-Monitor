# Heart Rate Monitoring System 🚑💓

## Overview
This **Heart Rate Monitoring System** is a Node.js-based API that allows users to register, manage patients, and record & retrieve heart rate data. The system is built with **Express.js** and **MySQL**, ensuring efficient data management and smooth operations.

## Features 🚀
- **User Authentication**: Email & password-based registration and login (no OAuth or JWT required).
- **Patient Management**: Add and retrieve patient details.
- **Heart Rate Tracking**: Record and retrieve patient heart rate data.
- **Secure Passwords**: Uses **bcrypt.js** for hashing.
- **Middleware Authentication**: Protects routes using JWT authentication.

## Technologies Used 🛠️
- **Node.js & Express.js** - Backend framework
- **MySQL** - Database
- **bcrypt.js** - Password hashing
- **jsonwebtoken** - JWT-based authentication
- **dotenv** - Environment variable management
**##DataBase MySQL Table**
      CREATE DATABASE healthcare_db;
      
      USE healthcare_db;
      
      CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
      );
      
      CREATE TABLE patients (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          age INT NOT NULL,
          gender ENUM('male', 'female', 'other') NOT NULL,
          medicalHistory TEXT,
          userId INT,
          FOREIGN KEY (userId) REFERENCES users(id)
      );
      
      CREATE TABLE heart_rates (
          id INT AUTO_INCREMENT PRIMARY KEY,
          patientId INT,
          bpm INT NOT NULL,
          recordedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (patientId) REFERENCES patients(id)
      );

## Database Schema 📊
### **Users Table**
| Column    | Type         | Description               |
|-----------|-------------|---------------------------|
| id        | INT (PK)    | Auto-incremented User ID  |
| email     | VARCHAR(255)| User email (unique)       |
| password  | VARCHAR(255)| Hashed password           |

### **Patients Table**
| Column         | Type         | Description                   |
|---------------|-------------|-------------------------------|
| id           | INT (PK)    | Auto-incremented Patient ID   |
| name         | VARCHAR(255)| Patient’s Name                |
| age          | INT         | Patient’s Age                 |
| gender       | VARCHAR(10) | Patient’s Gender              |
| medicalHistory | TEXT       | Patient’s Medical History     |
| userId       | INT (FK)    | Associated User (Doctor)      |

### **Heart Rate Table**
| Column     | Type         | Description                     |
|-----------|-------------|---------------------------------|
| id        | INT (PK)    | Auto-incremented Record ID     |
| bpm       | INT         | Recorded Heart Rate (BPM)      |
| patientId | INT (FK)    | Associated Patient ID          |
| recordedAt | TIMESTAMP  | Time of heart rate recording   |

**Database Relationship:**
-Each patient can have multiple heart rate records.
-The heart_rates table should have a foreign key referencing the patients table.
##
**Relationship Explanation:**
-One-to-Many Relationship: One patient can have many heart rate records.
-The patientId in heart_rates is a foreign key linking it to the patients table.
-ON DELETE CASCADE ensures that if a patient is deleted, their heart rate records are also removed.
##

## API Endpoints 🔥
### **User Authentication**
- `POST /users/register` - Register a new user.
- `POST /users/login` - Login using email & password.

### **Patient Management**
- `POST /patients` - Add a new patient.
- `GET /patients/:id` - Retrieve patient details by ID.

### **Heart Rate Management**
- `POST /heart-rate` - Record a patient's heart rate.
- `GET /heart-rate/:patientId` - Get heart rate history for a patient.
-  GET /heart-rate/:patientId/letest - Get latest heart rate for a patient.
-  GET /heart-rate/:patientId/Average  -Get Average Heart rate for patient.

## Installation & Setup ⚡
1. Clone the repository:
   ```sh
   git clone https://github.com/Kishorevijay07/H.git
   cd Heart-Rate-Monitor
2.Installation :
npm install express nodemon bcrypt jsonwebtoken dotenv mysql2 cookie-parser body-parser

3.Start the Server :
npm run dev

