# AI Smart Tourism Planner

A futuristic, AI-powered travel planning platform built with MERN stack (MongoDB, Express, React, Node.js).

## Features

- 🤖 AI-powered trip planning
- 🏨 Hotel finder and booking
- 💰 Smart budget estimator
- 🗺️ Smart route optimization
- ⭐ User reviews and ratings
- 📸 Image gallery for destinations
- 🌤️ Weather integration
- 🍽️ Food recommendations
- 👨‍💼 Admin dashboard
- 🔐 Secure JWT authentication

## Tech Stack

**Frontend:**
- React.js with Vite
- React Router DOM
- Axios
- Framer Motion
- CSS3 with Glassmorphism

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JWT Authentication
- Node.js Crypto module

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone https://github.com/katherinepatrova18-lang/AI-Smart-Tourism-Planner.git
cd AI-Smart-Tourism-Planner
```

2. Install root dependencies
```bash
npm install
```

3. Setup Backend
```bash
cd server
npm install
```

Create `.env` file in `server/` directory:
```
MONGODB_URI=mongodb://localhost:27017/tourism-planner
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

4. Setup Frontend
```bash
cd ../client
npm install
```

## Running the Application

### Development Mode (Both Frontend & Backend)
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Running separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## Project Structure

```
root/
├── server/              # Backend
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   └── server.js
├── client/              # Frontend
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   └── package.json
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user

### Destinations
- `GET /api/destinations` - Get all destinations
- `POST /api/destinations` - Create destination (Admin)
- `PUT /api/destinations/:id` - Update destination (Admin)
- `DELETE /api/destinations/:id` - Delete destination (Admin)

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel details
- `POST /api/hotels` - Create hotel (Admin)
- `PUT /api/hotels/:id` - Update hotel (Admin)
- `DELETE /api/hotels/:id` - Delete hotel (Admin)

### Trips
- `POST /api/trips` - Create trip
- `GET /api/trips/user/:id` - Get user trips
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip

### Reviews
- `POST /api/reviews` - Add review
- `GET /api/reviews` - Get all reviews

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user/:id` - Get user bookings

## Color Palette

- Dark Navy: `#0F172A`
- Blue: `#1E40AF`
- Bright Blue: `#3B82F6`
- Cyan: `#06B6D4`
- White: `#F8FAFC`

## License

ISC
