# Setup Instructions

## Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- npm or yarn

## Installation

### 1. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in `server/` directory:
```
MONGODB_URI=mongodb://localhost:27017/tourism-planner
JWT_SECRET=your_super_secret_jwt_key_change_in_production
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 2. Frontend Setup

```bash
cd client
npm install
```

## Running the Application

### Option 1: Run Both Frontend & Backend (from root)

```bash
npm run dev
```

This will start:
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

### Option 2: Run Separately

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

## Building for Production

```bash
cd client
npm run build
```

This creates optimized production build in `client/dist/`

## API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Destination Endpoints
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get destination details
- `GET /api/destinations/popular` - Get popular destinations
- `POST /api/destinations` - Create destination (Admin)
- `PUT /api/destinations/:id` - Update destination (Admin)
- `DELETE /api/destinations/:id` - Delete destination (Admin)

### Hotel Endpoints
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel details
- `POST /api/hotels` - Create hotel (Admin)
- `PUT /api/hotels/:id` - Update hotel (Admin)
- `DELETE /api/hotels/:id` - Delete hotel (Admin)

### Trip Endpoints
- `POST /api/trips` - Create trip
- `GET /api/trips/user/:userId` - Get user trips
- `GET /api/trips/:id` - Get trip details
- `PUT /api/trips/:id` - Update trip
- `PUT /api/trips/:id/save` - Save trip
- `DELETE /api/trips/:id` - Delete trip

### Budget Endpoints
- `POST /api/budgets` - Create budget
- `GET /api/budgets/user/:userId` - Get user budgets
- `GET /api/budgets/:id` - Get budget details
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget

### Review Endpoints
- `POST /api/reviews` - Create review
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/:id` - Get review details
- `PUT /api/reviews/:id` - Update review
- `PUT /api/reviews/:id/helpful` - Mark as helpful
- `DELETE /api/reviews/:id` - Delete review (Admin)

### Booking Endpoints
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user/:userId` - Get user bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id/cancel` - Cancel booking

### Food Endpoints
- `GET /api/foods` - Get all foods
- `GET /api/foods/:id` - Get food details
- `POST /api/foods` - Create food (Admin)
- `PUT /api/foods/:id` - Update food (Admin)
- `DELETE /api/foods/:id` - Delete food (Admin)

### Statistics Endpoints
- `GET /api/stats` - Get platform statistics
- `GET /api/stats/admin/dashboard` - Get admin dashboard stats (Admin)

### Upload Endpoints
- `POST /api/uploads/single` - Upload single image (Admin)
- `POST /api/uploads/multiple` - Upload multiple images (Admin)

## Features Implemented

✅ User Authentication (JWT + Crypto password hashing)
✅ Destination Explorer with search and filters
✅ AI-powered Trip Planner
✅ Hotel Finder with booking system
✅ Smart Budget Estimator
✅ Reviews and Ratings
✅ User Dashboard
✅ Favorites System
✅ Trip Saving
✅ Responsive Design
✅ Premium UI with Glassmorphism
✅ Framer Motion Animations
✅ Image Upload System
✅ Weather Information
✅ Food Recommendations

## Technology Stack

**Frontend:**
- React 18
- Vite
- React Router DOM
- Axios
- Framer Motion
- React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Crypto (Node.js native)

## Project Structure

```
root/
├── server/                 # Backend
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   └── server.js
├── client/                 # Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
└── package.json
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or connection string is correct
- Check `MONGODB_URI` in `.env` file

### Port Already in Use
- Change `PORT` in `.env` for backend
- Change port in `vite.config.js` for frontend

### CORS Errors
- Ensure `CLIENT_URL` matches frontend URL
- Check `CORS` configuration in `server.js`

## License
ISC
