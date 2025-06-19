const express = require('express');
const router = express.Router();
const Bicycle = require('../models/Bicycle');
const {auth,adminAuth} = require('../middleware/auth'); // We'll create this next

// @route   GET /api/bicycles
// @desc    Get all bicycles with filtering and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Extract query parameters
    const { 
      category, 
      minPrice, 
      maxPrice, 
      brand, 
      search, 
      page = 1, 
      limit = 12,
      sort = 'createdAt',
      order = 'desc'
    } = req.query;

    // Build filter object
    let filter = {};
    
    if (category) filter.category = category;
    if (brand) filter.brand = new RegExp(brand, 'i'); // Case insensitive
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { brand: new RegExp(search, 'i') }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    // Execute query
    const bicycles = await Bicycle.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit))
      .populate('reviews.user', 'name avatar');

    // Get total count for pagination
    const total = await Bicycle.countDocuments(filter);

    res.json({
      success: true,
      data: bicycles,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching bicycles' 
    });
  }
});

// @route   GET /api/bicycles/:id
// @desc    Get single bicycle by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const bicycle = await Bicycle.findById(req.params.id)
      .populate('reviews.user', 'name avatar');
    
    if (!bicycle) {
      return res.status(404).json({ 
        success: false, 
        message: 'Bicycle not found' 
      });
    }

    res.json({
      success: true,
      data: bicycle
    });

  } catch (error) {
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(404).json({ 
        success: false, 
        message: 'Bicycle not found' 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   GET /api/bicycles/featured/list
// @desc    Get featured bicycles
// @access  Public
router.get('/featured/list', async (req, res) => {
  try {
    const bicycles = await Bicycle.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      success: true,
      data: bicycles
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching featured bicycles' 
    });
  }
});

// @route   POST api/bicycles
// @desc    Create a new bicycle
// @access  Private/Admin
router.post('/', [auth, adminAuth], async (req, res) => {
  try {
    const newBicycle = new Bicycle({ ...req.body });
    const bicycle = await newBicycle.save();
    res.status(201).json({ success: true, data: bicycle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   PUT api/bicycles/:id
// @desc    Update a bicycle
// @access  Private/Admin
router.put('/:id', [auth, adminAuth], async (req, res) => {
  try {
    let bicycle = await Bicycle.findById(req.params.id);
    if (!bicycle) {
      return res.status(404).json({ success: false, message: 'Bicycle not found' });
    }
    bicycle = await Bicycle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ success: true, data: bicycle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   DELETE api/bicycles/:id
// @desc    Delete a bicycle
// @access  Private/Admin
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const bicycle = await Bicycle.findById(req.params.id);
    if (!bicycle) {
      return res.status(404).json({ success: false, message: 'Bicycle not found' });
    }
    await bicycle.deleteOne();
    res.json({ success: true, message: 'Bicycle removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;