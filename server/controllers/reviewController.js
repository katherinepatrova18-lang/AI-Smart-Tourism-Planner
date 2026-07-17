const Review = require('../models/Review');
const Destination = require('../models/Destination');
const Hotel = require('../models/Hotel');
const Attraction = require('../models/Attraction');
const Food = require('../models/Food');

// Create review
const createReview = async (req, res) => {
  try {
    const { destination, hotel, attraction, food, rating, title, comment, visitDate } = req.body;

    const newReview = new Review({
      user: req.user.userId,
      destination,
      hotel,
      attraction,
      food,
      rating,
      title,
      comment,
      visitDate,
      isVerified: true
    });

    await newReview.save();

    // Update rating for the respective item
    if (destination) {
      const dest = await Destination.findById(destination);
      const reviews = await Review.find({ destination });
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      await Destination.findByIdAndUpdate(destination, { rating: avgRating });
    }

    res.status(201).json({
      message: 'Review created successfully',
      review: newReview
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const { destination, hotel, sort } = req.query;
    let query = {};

    if (destination) query.destination = destination;
    if (hotel) query.hotel = hotel;

    let reviews = Review.find(query).populate('user');

    if (sort === 'recent') {
      reviews = reviews.sort({ createdAt: -1 });
    } else if (sort === 'helpful') {
      reviews = reviews.sort({ helpful: -1 });
    } else if (sort === 'rating-high') {
      reviews = reviews.sort({ rating: -1 });
    } else if (sort === 'rating-low') {
      reviews = reviews.sort({ rating: 1 });
    }

    const result = await reviews;

    res.status(200).json({
      message: 'Reviews retrieved',
      count: result.length,
      reviews: result
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Get review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('user');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({
      message: 'Review retrieved',
      review
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching review', error: error.message });
  }
};

// Update review
const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({
      message: 'Review updated successfully',
      review
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};

// Mark review as helpful
const markHelpful = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { $inc: { helpful: 1 } },
      { new: true }
    );

    res.status(200).json({
      message: 'Review marked as helpful',
      review
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  markHelpful
};
