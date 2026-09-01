
# 🌱 Smart AnganCare

Smart AnganCare is a web-based **Anganwadi Management and Child Health Monitoring System** designed to digitally manage Anganwadi centers, children, parents, attendance, nutrition, vaccination, and growth records.

The system provides different access levels for **Admin, Manager, and Parent** users, making it easier to manage child-related information and monitor their development.

---

## 🎯 Project Objective

The main objective of Smart AnganCare is to develop a centralized web application that helps Anganwadi administrators and managers efficiently manage child-related information while allowing parents to monitor their child's health and development.

### Key Objectives

- Manage Anganwadi center information.
- Manage children and parent records.
- Track daily attendance.
- Maintain vaccination records.
- Record nutrition information.
- Monitor child growth.
- Generate child health reports.
- Provide role-based access for Admin, Manager, and Parent users.
- Secure user authentication using JWT.

---

## ✨ Features

### 👨‍💼 Admin

The Admin has overall control of the system.

- Admin login
- Dashboard
- Manage Anganwadi centers
- Add, edit, and delete managers
- Manage children
- Manage parents
- View attendance records
- View nutrition records
- View vaccination records
- View growth records
- Generate reports
- Role-based access control

---

### 👩‍🏫 Manager

Managers can manage day-to-day Anganwadi activities.

- Manager login
- Dashboard
- Manage children
- Manage parents
- Record attendance
- Manage vaccination details
- Manage nutrition records
- Manage growth records
- View child information
- Generate child-related reports

---

### 👨‍👩‍👧 Parent

Parents can monitor their child's information.

- Parent login
- Parent dashboard
- View child's details
- View attendance
- View vaccination records
- View nutrition information
- View growth information
- View child reports
- Download reports

---

## 🔐 Authentication

Smart AnganCare uses **JWT (JSON Web Token)** based authentication.

The authentication system provides:

- Secure login
- Token-based authentication
- Protected API routes
- Role-based authorization
- Admin, Manager, and Parent access control

Passwords are securely handled using **bcrypt**.

---

## 🛠️ Technologies Used

### Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Axios
- React Router

### Backend

- Node.js
- Express.js
- REST API
- Sequelize ORM
- JWT
- bcrypt

### Database

- MySQL

### Deployment

- Vercel – Frontend
- Render – Backend
- Aiven MySQL – Database

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman

---

## 🏗️ System Architecture

```text
                    ┌───────────────────┐
                    │      Users        │
                    │ Admin / Manager   │
                    │      / Parent     │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ React Frontend    │
                    │      + Vite       │
                    └─────────┬─────────┘
                              │
                         REST API
                              │
                              ▼
                    ┌───────────────────┐
                    │ Node.js + Express │
                    │      Backend      │
                    └─────────┬─────────┘
                              │
                         Sequelize
                              │
                              ▼
                    ┌───────────────────┐
                    │      MySQL        │
                    │     Database      │
                    └───────────────────┘
````

---

## 📂 Project Structure

```text
Smart-AnganCare/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   ├── manager/
│   │   │   └── parent/
│   │   ├── services/
│   │   ├── context/
│   │   ├── routes/
│   │   └── App.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 📊 Main Modules

| Module             | Description                      |
| ------------------ | -------------------------------- |
| Authentication     | Login and role-based access      |
| Dashboard          | Overview of system information   |
| Center Management  | Manage Anganwadi centers         |
| Manager Management | Add, edit, and delete managers   |
| Child Management   | Manage child records             |
| Parent Management  | Manage parent information        |
| Attendance         | Track child attendance           |
| Vaccination        | Maintain vaccination records     |
| Nutrition          | Track nutrition information      |
| Growth Monitoring  | Record child growth measurements |
| Reports            | Generate child health reports    |

---

## 🔗 API Modules

The backend provides REST APIs for:

```text
/api/auth
/api/admin
/api/parent
/api/children
/api/parents
/api/centers
/api/attendance
/api/vaccinations
/api/nutrition
/api/growth
/api/reports
```

---

## ⚙️ Environment Variables

### Frontend

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:5000
```

For production:

```env
VITE_API_URL=https://your-backend-url
```

---

### Backend

Create a `.env` file inside the backend folder:

```env
PORT=5000

DB_HOST=your_database_host
DB_PORT=3306
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password

JWT_SECRET=your_jwt_secret
```

> Never upload `.env` files or database passwords to GitHub.

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/cchithramary-cell/Smart-AnganCare.git
```

### 2. Navigate to the project

```bash
cd Smart-AnganCare
```

### 3. Install frontend dependencies

```bash
cd client
npm install
```

### 4. Start the frontend

```bash
npm run dev
```

---

### 5. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 6. Start the backend

```bash
npm start
```

or, if using nodemon:

```bash
npm run dev
```

---

## 🌐 Deployment

### Frontend

The React frontend can be deployed using **Vercel**.

Recommended Vercel configuration:

```text
Root Directory: client

Install Command:
npm install

Build Command:
npm run build

Output Directory:
dist
```

Add the production API URL as a Vercel environment variable:

```text
VITE_API_URL = https://your-backend-url
```

---

### Backend

The Node.js/Express backend can be deployed using **Render**.

Example backend URL:

```text
https://your-backend.onrender.com
```

The frontend should use this URL through:

```env
VITE_API_URL=https://your-backend.onrender.com
```

---

## 🔒 Security

The application uses:

* JWT authentication
* Password hashing using bcrypt
* Protected API routes
* Role-based authorization
* Environment variables for sensitive configuration
* Token-based API requests

---

## 📱 User Roles

```text
                 Smart AnganCare
                       │
          ┌────────────┼────────────┐
          │            │            │
        Admin       Manager       Parent
          │            │            │
       Full          Manage       View own
      Control        Records       Child
          │            │            │
          └────────────┼────────────┘
                       │
                 Child Health
                  Information
```

---

## 🎯 Future Enhancements

Possible future improvements include:

* SMS notifications for parents
* Email notifications
* Advanced health analytics
* Automated growth charts
* Mobile application
* Improved report generation
* Cloud file storage
* Real-time notifications
* More detailed health monitoring

---

## 👩‍💻 Developer

**Arockia Varsha**

Computer Science and Engineering

---

## 📄 License

This project is developed for educational and project demonstration purposes.

````


```

Also, your **production README should describe the actual folder structure**. If your backend folder is named something other than `server`, tell me your exact GitHub folder structure and I can adjust the README to match it exactly.
