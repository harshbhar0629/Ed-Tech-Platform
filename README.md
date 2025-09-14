# 🌟 Tech-Treasure Hub - Ed-Tech Platform

[🔗 Live Demo](https://ed-tech-platform-tau.vercel.app/)

## 🚀 Project Overview

**Tech-Treasure Hub** is a fully functional **Ed-Tech Platform** designed to provide an immersive and interactive learning experience. Built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** combined with **Tailwind CSS**, this platform empowers students to discover, consume, and rate educational content, while giving instructors the tools to create and manage courses.

---

## 🧱 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Redux, Axios  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Atlas)  
- **Authentication**: JWT, Bcrypt  
- **Media Management**: Cloudinary  
- **Payment Gateway**: Razorpay  
- **Deployment**: Vercel (Frontend), Railway/Render (Backend)

---

## 🎯 Key Features

### For Students
- Browse and search courses  
- Add courses to Wishlist & Cart  
- Enroll in paid courses  
- Access detailed course content (videos, documents)  
- Rate and review courses  
- Manage user profile and personal details  

### For Instructors
- Create, update, and delete courses  
- Upload and manage course media  
- View course performance insights  
- Manage own profile and course details  

### Admin (Future Scope)
- Dashboard for platform-wide metrics  
- Manage instructors, courses, and users  

---

## 🏗️ System Architecture

The platform follows a **client-server architecture**:
- **Frontend (React)** communicates with the **Backend (Node + Express)** using RESTful APIs.  
- **Database (MongoDB)** stores users, courses, and media references.  
- Media files are hosted in **Cloudinary**.  
- Payments are handled via **Razorpay integration**.

---

## ⚡ API Endpoints (Sample)

- `POST /api/auth/signup` – User registration  
- `POST /api/auth/login` – Login & get JWT token  
- `GET /api/courses` – List all courses  
- `POST /api/courses` – Create a new course (Instructor)  
- `POST /api/courses/:id/rate` – Rate a course  
- `PUT /api/courses/:id` – Update a course (Instructor)  
- `DELETE /api/courses/:id` – Delete a course (Instructor)  

## 📈 Future Enhancements

- Gamification (Badges, Points, Leaderboards)  
- Personalized Learning Paths  
- Social Learning Features (Discussions, Peer Reviews)  
- Mobile App Development  
- Machine Learning-powered Course Recommendations  
- Virtual Reality/Augmented Reality Integration  

---

---

## 📦 Deployment

- Frontend/Backend deployed on [Vercel](https://vercel.com/)  
- MongoDB hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)  
- Media content managed by [Cloudinary](https://cloudinary.com/)

---

## 🌐 Live Project

👉 [https://ed-tech-platform-tau.vercel.app/](https://ed-tech-platform-tau.vercel.app/)

---

## 🛠️ Getting Started

To get a local copy of the project up and running, follow these steps:

Clone the repository:  
```bash
git clone https://github.com/harshbhar0629/Ed-Tech-Platform.git

```

Download dependency for frontend
```
cd frontend
npm install
```

Download dependency for frontend
```
cd ../backend
npm install
```

Run Server
``` 
npm run dev
```

Open your browser and visit http://localhost:3000
 to see the application in action.