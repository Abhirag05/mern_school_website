# MERN School Website

A full-stack school website built using the MERN stack (MongoDB, Express, React, Node.js) featuring a modern frontend for visitors, an admin dashboard for content management, and a backend REST API. This project is designed for real-world school/education needs, including news, gallery, staff, academics, admission, and contact modules.

---
## 🔗 Live Demo & Repository

- 🌐 **Live Site:** [https://sjlps.vercel.app](https://sjlps.vercel.app)  
- 📦 **GitHub:** [https://github.com/Abhirag05/mern_school_website](https://github.com/Abhirag05/mern_school_website)

---

## Project Structure
```
mern_school_website/
│
├── admin_dashboard/      # React + Vite admin panel for staff/news/gallery
├── backend/              # Node.js/Express REST API + MongoDB
├── school_frontend/      # React + Vite public-facing website
└── README.md             # (You are here)
```

---

## Features
### School Frontend (`school_frontend/`)
- **Home Page**: Modern landing page for the school.
- **About Us**: School overview, mission, and vision.
- **Academics**: Academic programs, class details, and tabs for info.
- **Gallery**: Filterable photo gallery (school, events, facilities).
- **Staffs**: Teaching and non-teaching staff directory with photos.
- **Admission**: Online admission info and form.
- **Contact Us**: Contact form with validation.
- **Responsive Design**: Mobile-first, using MUI, Emotion, and custom CSS.

### Admin Dashboard (`admin_dashboard/`)
- **Authentication**: Secure admin login.
- **News Manager**: Add/edit/delete school news.
- **Gallery Manager**: Upload/edit/delete gallery images (Cloudinary integration).
- **Staff Manager**: Add/edit/delete staff profiles with images.
- **Logout**: Secure session management.
- **Modern UI**: Built with Tailwind CSS, Lucide icons, and React.

### Backend (`backend/`)
- **REST API**: Express.js endpoints for news, staff, gallery, and admin login.
- **MongoDB**: Mongoose models for news, gallery, staff.
- **Authentication**: JWT-based admin authentication middleware.
- **File Uploads**: Multer for image uploads, Cloudinary for storage.
- **CORS & Security**: Proper middleware for API security.
- **Environment-based config**: Uses dotenv for configuration.

---

## Tech Stack
- **Frontend**: React 18/19, Vite, MUI, Emotion, Framer Motion, React Router, Axios
- **Admin Dashboard**: React, Vite, Tailwind CSS, Lucide, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose, Cloudinary, Multer, JWT, dotenv

---

## Setup & Installation
### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB database
- Cloudinary account (for image uploads)

### 1. Clone the Repository
```sh
git clone https://github.com/Abhirag05/mern_school_website.git
```

### 2. Install Dependencies
For each subfolder (`admin_dashboard`, `backend`, `school_frontend`):
```sh
cd <subfolder>
npm install
```

### 3. Run the Project
- **Backend**
  ```sh
  cd backend
  npm run server
  # or: npm start
  ```
- **School Frontend**
  ```sh
  cd school_frontend
  npm run dev
  ```
- **Admin Dashboard**
  ```sh
  cd admin_dashboard
  npm run dev
  ```

---

```
VITE_API_URL=http://localhost:4000
```
---

## Scripts
Each frontend uses Vite, so you can use:
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build

Backend:
- `npm run server` — Start backend with nodemon
- `npm start` — Start backend normally

---

## API Overview (Backend)
- `POST   /api/login` — Admin login
- `GET    /api/news/all` — List all news
- `POST   /api/news/add` — Add news (admin)
- `PUT    /api/news/edit/:id` — Edit news (admin)
- `DELETE /api/news/delete/:id` — Delete news (admin)
- `GET    /api/gallery/all` — List all gallery images
- `POST   /api/gallery/add` — Add gallery image (admin)
- `PUT    /api/gallery/edit/:id` — Edit gallery image (admin)
- `DELETE /api/gallery/delete/:id` — Delete gallery image (admin)
- `GET    /api/staff/all` — List all staff
- `POST   /api/staff/add` — Add staff (admin)
- `PUT    /api/staff/edit/:id` — Edit staff (admin)
- `DELETE /api/staff/delete/:id` — Delete staff (admin)

---

## License
This project is licensed under the MIT License.

---

