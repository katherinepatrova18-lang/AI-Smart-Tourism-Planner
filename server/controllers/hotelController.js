const Hotel = require('../models/Hotel');

// Get all hotels
const getAllHotels = async (req, res) => {
  try {
    const { destination, minPrice, maxPrice, minRating, search } = req.query;
    let query = {};

    if (destination) query.destination = destination;
    if (minPrice || maxPrice) {
      query['price.perNight'] = {};
      if (minPrice) query['price.perNight'].$gte = Number(minPrice);
      if (maxPrice) query['price.perNight'].$lte = Number(maxPrice);
    }
    if (minRating) query.rating = { $gte: Number(minRating) };
    if (search) query.name = { $regex: search, $options: 'i' };

    const hotels = await Hotel.find(query)
      .populate('destination')
      .populate('reviews');

    res.status(200).json({
      message: 'Hotels retrieved',
      count: hotels.length,
      hotels
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels', error: error.message });
  }
};

// Get hotel by ID
const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
      .populate('destination')
      .populate('reviews');

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.status(200).json({
      message: 'Hotel retrieved',
      hotel
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotel', error: error.message });
  }
};

// Create hotel (Admin)
const createHotel = async (req, res) => {
  try {
    const { name, destination, location, description, bannerImage, price, facilities, rooms, mapCoordinates } = req.body;

    const newHotel = new Hotel({
      name,
      destination,
      location,
      description,
      bannerImage,
      price,
      facilities,
      rooms,
      mapCoordinates
    });

    await newHotel.save();

    res.status(201).json({
      message: 'Hotel created successfully',
      hotel: newHotel
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating hotel', error: error.message });
  }
};

// Update hotel (Admin)
const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.status(200).json({
      message: 'Hotel updated successfully',
      hotel
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating hotel', error: error.message });
  }
};

// Delete hotel (Admin)
const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.status(200).json({
      message: 'Hotel deleted successfully',
      hotel
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hotel', error: error.message });
  }
};

module.exports = {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel
};
