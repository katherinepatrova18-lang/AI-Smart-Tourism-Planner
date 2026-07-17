require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const keys = require('./config/keys');
const errorHandler = require('./middleware/errorHandler');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: keys.clientUrl,
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/destinations', require('./routes/destinationRoutes'));
app.use('/api/hotels', require('./routes/hotelRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/budgets', require('./routes/budgetRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));
app.use('/api/uploads', require('./routes/uploadRoutes'));
app.use('/api/foods', require('./routes/foodRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running', timestamp: new Date() });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = keys.port;
app.listen(PORT, () => {
  console.log(`
========================================`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${keys.nodeEnv}`);
  console.log(`Client URL: ${keys.clientUrl}`);
  console.log(`========================================
`);
});

module.exports = app;
