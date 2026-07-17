# AI Smart Tourism Planner

A futuristic, AI-powered travel planning platform built with MERN stack (MongoDB, Express, React, Node.js).

## 🌟 Features

- 🤖 **AI-powered Trip Planning** - Get personalized itineraries based on your preferences
- 🏨 **Smart Hotel Finder** - Search and book hotels with advanced filtering
- 💰 **Budget Estimator** - Calculate and optimize your travel expenses
- 🗺️ **Route Optimization** - Find the best travel routes
- ⭐ **Reviews & Ratings** - Read authentic traveler experiences
- 📸 **Image Gallery** - Explore stunning destination photos
- 🔐 **Secure Authentication** - JWT + Crypto-based password hashing
- 📱 **Responsive Design** - Works seamlessly on all devices
- ✨ **Premium UI** - Modern glassmorphism design with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/katherinepatrova18-lang/AI-Smart-Tourism-Planner.git
   cd AI-Smart-Tourism-Planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   ```

3. **Configure Environment**
   - Create `.env` in `server/` directory
   - Add MongoDB URI and JWT secret
   - See `SETUP.md` for detailed configuration

4. **Run the Application**
   ```bash
   # From root directory
   npm run dev
   ```

   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📚 Documentation

See [SETUP.md](./SETUP.md) for detailed setup instructions and API documentation.

## 🏗️ Project Structure

```
root/
├── server/              # Backend (Node.js + Express)
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── server.js
├── client/              # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
└── package.json
```

## 🎨 Design System

**Color Palette:**
- Dark Navy: `#0F172A`
- Blue: `#1E40AF`
- Bright Blue: `#3B82F6`
- Cyan: `#06B6D4`
- White: `#F8FAFC`

**Features:**
- Glassmorphism Cards
- Gradient Backgrounds
- Smooth Animations (Framer Motion)
- Responsive Grid System
- Modern Typography

## 🔐 Security

- **Password Hashing**: Node.js Crypto module (PBKDF2)
- **Authentication**: JWT tokens
- **Protected Routes**: Client-side route protection
- **CORS**: Configured for development

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite (Build tool)
- React Router DOM
- Axios (HTTP client)
- Framer Motion (Animations)
- React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JWT (Authentication)
- Multer (File upload)

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`

### Destinations
- `GET /api/destinations`
- `GET /api/destinations/:id`
- `GET /api/destinations/popular`

### Hotels
- `GET /api/hotels`
- `GET /api/hotels/:id`

### Trips
- `POST /api/trips`
- `GET /api/trips/user/:userId`
- `PUT /api/trips/:id`

### Budgets
- `POST /api/budgets`
- `GET /api/budgets/user/:userId`

### Reviews
- `POST /api/reviews`
- `GET /api/reviews`

### Bookings
- `POST /api/bookings`
- `GET /api/bookings/user/:userId`

## 🎯 Features Implemented

✅ User Authentication with JWT
✅ Crypto-based Password Hashing
✅ Dynamic Destination Explorer
✅ Hotel Finder with Filters
✅ AI Trip Planner
✅ Smart Budget Calculator
✅ Reviews and Ratings System
✅ Booking System
✅ User Profile Management
✅ Favorites System
✅ Trip Saving
✅ Image Upload
✅ Weather Integration
✅ Food Recommendations
✅ Statistics Dashboard
✅ Admin Controls
✅ Responsive Design
✅ Glassmorphism UI
✅ Smooth Animations

## 📝 License

ISC License

## 👨‍💻 Author

Katherine Patrova

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests.

## 📞 Support

For support, please create an issue in the repository.
