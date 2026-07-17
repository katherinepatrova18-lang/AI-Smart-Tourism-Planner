// Upload controller
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    res.status(201).json({
      message: 'Image uploaded successfully',
      imagePath,
      filename: req.file.filename,
      size: req.file.size
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
};

// Upload multiple images
const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const imagePaths = req.files.map(file => ({
      filename: file.filename,
      path: `/uploads/${file.filename}`,
      size: file.size
    }));

    res.status(201).json({
      message: 'Images uploaded successfully',
      images: imagePaths
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading images', error: error.message });
  }
};

module.exports = {
  uploadImage,
  uploadMultipleImages
};
