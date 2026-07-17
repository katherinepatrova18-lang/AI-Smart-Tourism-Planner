const Destination = require('../models/Destination');

// Get all destinations
const getAllDestinations = async (req, res) => {
  try {
    const { search, sort } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      };
    }

    let destinations = Destination.find(query);

    if (sort === 'rating') {
      destinations = destinations.sort({ rating: -1 });
    } else if (sort === 'popular') {
      destinations = destinations.sort({ isPopular: -1 });
    }

    const result = await destinations.populate('reviews');

    res.status(200).json({
      message: 'Destinations retrieved',
      count: result.length,
      destinations: result
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching destinations', error: error.message });
  }
};

// Get destination by ID
const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id).populate('reviews');

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.status(200).json({
      message: 'Destination retrieved',
      destination
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching destination', error: error.message });
  }
};

// Create destination (Admin)
const createDestination = async (req, res) => {
  try {
    const { name, location, description, coverImage, bestTime, weather, attractions, foods, mapCoordinates } = req.body;

    const newDestination = new Destination({
      name,
      location,
      description,
      coverImage,
      bestTime,
      weather,
      attractions,
      foods,
      mapCoordinates
    });

    await newDestination.save();

    res.status(201).json({
      message: 'Destination created successfully',
      destination: newDestination
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating destination', error: error.message });
  }
};

// Update destination (Admin)
const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.status(200).json({
      message: 'Destination updated successfully',
      destination
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating destination', error: error.message });
  }
};

// Delete destination (Admin)
const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.status(200).json({
      message: 'Destination deleted successfully',
      destination
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting destination', error: error.message });
  }
};

// Get popular destinations
const getPopularDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({ isPopular: true }).limit(6);

    res.status(200).json({
      message: 'Popular destinations retrieved',
      count: destinations.length,
      destinations
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching popular destinations', error: error.message });
  }
};

module.exports = {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  getPopularDestinations
};
