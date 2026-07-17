const Food = require('../models/Food');

// Get all foods
const getAllFoods = async (req, res) => {
  try {
    const { destination, category, search } = req.query;
    let query = {};

    if (destination) query.destination = destination;
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const foods = await Food.find(query)
      .populate('destination')
      .sort({ rating: -1 });

    res.status(200).json({
      message: 'Foods retrieved',
      count: foods.length,
      foods
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching foods', error: error.message });
  }
};

// Get food by ID
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('destination');

    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.status(200).json({
      message: 'Food retrieved',
      food
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food', error: error.message });
  }
};

// Create food (Admin)
const createFood = async (req, res) => {
  try {
    const { name, destination, description, image, category, restaurants, ingredients } = req.body;

    const newFood = new Food({
      name,
      destination,
      description,
      image,
      category,
      restaurants,
      ingredients
    });

    await newFood.save();

    res.status(201).json({
      message: 'Food item created successfully',
      food: newFood
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating food item', error: error.message });
  }
};

// Update food (Admin)
const updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.status(200).json({
      message: 'Food item updated successfully',
      food
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating food item', error: error.message });
  }
};

// Delete food (Admin)
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.status(200).json({
      message: 'Food item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting food item', error: error.message });
  }
};

module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
};
