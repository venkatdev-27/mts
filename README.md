# Project Structure

This project has been restructured into three separate applications:

## Folder Structure

```
MTS/
├── backend/              # Node.js + TypeScript + Express + MongoDB API
│   ├── config/          # Database configuration
│   ├── controllers/     # API controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── scripts/         # Utility scripts (seed data, etc.)
│   └── server.ts        # Main server file
│
├── client/              # Public-facing React frontend
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components (Home, Projects, Contact, etc.)
│   ├── services/       # API service layer
│   ├── data/           # Static data
│   └── App.tsx         # Main client app
│
└── admin-frontend/      # Admin panel React frontend
    ├── src/
    │   ├── pages/      # Admin pages (Login, Dashboard, Management)
    │   ├── services/   # API service layer
    │   └── App.tsx     # Main admin app
    └── package.json
```

## Running the Applications

### Backend API (Port 5000)
```bash
cd backend
npm run dev
```

### Client Frontend (Port 5173)
```bash
cd client
npm run dev
```

### Admin Panel (Port 5174)
```bash
cd admin-frontend
npm run dev
```

## Admin Panel Credentials
- Username: `admin`
- Password: `admin123`

## Features

### Client Application
- Browse all projects
- View project details
- Filter projects by category
- Contact form submission

### Admin Panel
- Login authentication
- Dashboard overview
- **Project Management**: Create, Read, Update, Delete projects
- **Support Management**: View and manage contact form submissions
- Real-time database synchronization

All three applications communicate through the same backend API running on port 5000.
