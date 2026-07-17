const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');

// Create booking
const createBooking = async (req, res) => {
  try {
    const { hotel, checkInDate, checkOutDate, numberOfGuests, numberOfRooms, roomType, totalPrice, specialRequests, guestInfo } = req.body;

    const newBooking = new Booking({
      user: req.user.userId,
      hotel,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      numberOfRooms,
      roomType,
      totalPrice,
      specialRequests,
      guestInfo,
      paymentStatus: 'completed',
      bookingStatus: 'confirmed'
    });

    await newBooking.save();
    await newBooking.populate('hotel');

    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// Get user bookings
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate('hotel')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Bookings retrieved',
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('hotel');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      message: 'Booking retrieved',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error: error.message });
  }
};

// Update booking
const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      message: 'Booking updated successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { bookingStatus: 'cancelled' },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBooking,
  cancelBooking
};
