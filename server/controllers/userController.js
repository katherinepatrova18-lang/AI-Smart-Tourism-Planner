const User = require('../models/User');
const Favorite = require('../models/Favorite');
const Trip = require('../models/Trip');
const Booking = require('../models/Booking');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password -salt');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User profile retrieved',
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, bio, preferences, profileImage } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        name: name || undefined,
        phone: phone || undefined,
        bio: bio || undefined,
        preferences: preferences || undefined,
        profileImage: profileImage || undefined
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

// Get user favorites
const getUserFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.userId })
      .populate('destination')
      .populate('hotel')
      .populate('attraction')
      .populate('food')
      .populate('trip');

    res.status(200).json({
      message: 'Favorites retrieved',
      favorites
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error: error.message });
  }
};

// Get user saved trips
const getUserSavedTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.userId, isSaved: true })
      .populate('destination')
      .populate('hotels')
      .populate('attractions');

    res.status(200).json({
      message: 'Saved trips retrieved',
      trips
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved trips', error: error.message });
  }
};

// Get user bookings
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId })
      .populate('hotel')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Bookings retrieved',
      bookings
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserFavorites,
  getUserSavedTrips,
  getUserBookings
};
