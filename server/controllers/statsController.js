const User = require('../models/User');
const Destination = require('../models/Destination');
const Hotel = require('../models/Hotel');
const Review = require('../models/Review');
const Trip = require('../models/Trip');
const Booking = require('../models/Booking');

// Get platform statistics
const getPlatformStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDestinations = await Destination.countDocuments();
    const totalHotels = await Hotel.countDocuments();
    const totalReviews = await Review.countDocuments();
    const totalTrips = await Trip.countDocuments();
    const totalBookings = await Booking.countDocuments();

    // Calculate average rating
    const destinations = await Destination.find().select('rating');
    const avgRating = destinations.length > 0
      ? (destinations.reduce((sum, d) => sum + d.rating, 0) / destinations.length).toFixed(1)
      : 0;

    res.status(200).json({
      message: 'Platform statistics retrieved',
      stats: {
        totalUsers,
        totalDestinations,
        totalHotels,
        totalReviews,
        totalTrips,
        totalBookings,
        averageRating: avgRating,
        happyTravelers: totalUsers,
        destinations: totalDestinations,
        rating: parseFloat(avgRating),
        aiAssistant: '24/7'
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
};

// Get admin dashboard stats
const getAdminDashboardStats = async (req, res) => {
  try {
    const stats = {
      users: await User.countDocuments(),
      destinations: await Destination.countDocuments(),
      hotels: await Hotel.countDocuments(),
      reviews: await Review.countDocuments(),
      trips: await Trip.countDocuments(),
      bookings: await Booking.countDocuments(),
      recentUsers: await User.find().limit(5).sort({ createdAt: -1 }),
      recentBookings: await Booking.find().limit(5).sort({ createdAt: -1 }).populate('hotel'),
      recentTrips: await Trip.find().limit(5).sort({ createdAt: -1 }).populate('destination')
    };

    res.status(200).json({
      message: 'Admin dashboard statistics retrieved',
      stats
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin stats', error: error.message });
  }
};

module.exports = {
  getPlatformStats,
  getAdminDashboardStats
};
