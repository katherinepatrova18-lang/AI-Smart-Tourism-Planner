const Trip = require('../models/Trip');
const Destination = require('../models/Destination');

// Create trip
const createTrip = async (req, res) => {
  try {
    const { title, destination, startDate, endDate, numberOfDays, numberOfTravelers, budget, travelPreferences } = req.body;

    const newTrip = new Trip({
      user: req.user.userId,
      title,
      destination,
      startDate,
      endDate,
      numberOfDays,
      numberOfTravelers,
      budget,
      travelPreferences,
      status: 'draft'
    });

    await newTrip.save();
    await newTrip.populate('destination');

    res.status(201).json({
      message: 'Trip created successfully',
      trip: newTrip
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating trip', error: error.message });
  }
};

// Get user trips
const getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.params.userId })
      .populate('destination')
      .populate('hotels')
      .populate('attractions')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'User trips retrieved',
      count: trips.length,
      trips
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips', error: error.message });
  }
};

// Get trip by ID
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('destination')
      .populate('hotels')
      .populate('attractions');

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json({
      message: 'Trip retrieved',
      trip
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trip', error: error.message });
  }
};

// Update trip
const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('destination')
      .populate('hotels')
      .populate('attractions');

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json({
      message: 'Trip updated successfully',
      trip
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating trip', error: error.message });
  }
};

// Delete trip
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json({
      message: 'Trip deleted successfully',
      trip
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trip', error: error.message });
  }
};

// Save trip
const saveTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { isSaved: true, status: 'planned' },
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json({
      message: 'Trip saved successfully',
      trip
    });
  } catch (error) {
    res.status(500).json({ message: 'Error saving trip', error: error.message });
  }
};

module.exports = {
  createTrip,
  getUserTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  saveTrip
};
