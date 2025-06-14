# 🛒 E-commerce Project

A modern **E-commerce Web Application** built with **React**, **Node.js**, **Express**, and **MySQL**, containerized using **Docker** for seamless development and deployment.

---

## 🚀 Features

- 🔐 Secure JWT Authentication
- 🛍️ Product Browsing with Search & Filtering
- 🛒 Cart Management (Add / Remove / Update)
- 💳 Order Placement & History
- 🛂 Admin Dashboard (CRUD for Products, Orders, Users)
- 📦 Role-based Access Control
- 📨 Email & Payment Integration Ready
- 📱 Responsive UI using Tailwind CSS

---

## 🧰 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React.js, Axios, Tailwind CSS     |
| Backend    | Node.js, Express.js, Sequelize    |
| Database   | MySQL                             |
| Auth       | JWT, bcrypt                       |
| Deployment | Docker, Docker Compose            |

---

## 🐳 Dockerized Setup

### 📦 Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### ⚙️ Quick Start

```bash
git clone https://github.com/Sijan-Giri/E-commerce-Project.git
cd E-commerce-Project
docker-compose up --build

.env
PORT=5000
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ecommerce_db
JWT_SECRET=your_jwt_secret







