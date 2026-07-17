const Budget = require('../models/Budget');
const Destination = require('../models/Destination');

// Create budget estimate
const createBudget = async (req, res) => {
  try {
    const { destination, numberOfDays, numberOfTravelers, totalBudget } = req.body;

    // Calculate breakdown
    const dailyBudget = totalBudget / numberOfDays / numberOfTravelers;
    const perPersonBudget = totalBudget / numberOfTravelers;

    const breakdown = {
      accommodation: {
        perNight: dailyBudget * 0.4,
        totalNights: numberOfDays,
        total: dailyBudget * 0.4 * numberOfDays * numberOfTravelers
      },
      food: {
        perDay: dailyBudget * 0.25,
        total: dailyBudget * 0.25 * numberOfDays * numberOfTravelers
      },
      activities: {
        estimate: dailyBudget * 0.2,
        total: dailyBudget * 0.2 * numberOfDays * numberOfTravelers
      },
      transport: {
        estimate: dailyBudget * 0.1,
        total: dailyBudget * 0.1 * numberOfDays * numberOfTravelers
      },
      miscellaneous: {
        estimate: dailyBudget * 0.05,
        total: dailyBudget * 0.05 * numberOfDays * numberOfTravelers
      }
    };

    const savingTips = [
      'Book flights in advance for better deals',
      'Use public transportation instead of taxis',
      'Eat at local restaurants for authentic and cheaper food',
      'Look for free attractions and walking tours',
      'Travel during off-season for better prices'
    ];

    const newBudget = new Budget({
      user: req.user.userId,
      destination,
      totalBudget,
      numberOfDays,
      numberOfTravelers,
      breakdown,
      perPersonBudget,
      savingTips
    });

    await newBudget.save();

    res.status(201).json({
      message: 'Budget estimate created successfully',
      budget: newBudget
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating budget', error: error.message });
  }
};

// Get user budgets
const getUserBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.params.userId })
      .populate('destination')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Budgets retrieved',
      count: budgets.length,
      budgets
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching budgets', error: error.message });
  }
};

// Get budget by ID
const getBudgetById = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id).populate('destination');

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json({
      message: 'Budget retrieved',
      budget
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching budget', error: error.message });
  }
};

// Update budget
const updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json({
      message: 'Budget updated successfully',
      budget
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating budget', error: error.message });
  }
};

// Delete budget
const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findByIdAndDelete(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json({
      message: 'Budget deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting budget', error: error.message });
  }
};

module.exports = {
  createBudget,
  getUserBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget
};
