// backend/routes/orders.js

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { auth, adminAuth } = require('../middleware/auth');

// @route   POST api/orders
// @desc    Create a new order
// @access  Private
router.post('/', auth, async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice
    });

    try {
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }
});

// @route   GET api/orders/myorders
// @desc    Get logged in user's orders
// @access  Private
router.get('/myorders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
      // Ensure only the user who owns the order or an admin can view it
      if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Not authorized' });
      }
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// NOTE: Payment integration (e.g., Stripe) would go here.
// For now, we'll manually mark an order as paid.

// @route   PUT api/orders/:id/pay
// @desc    Update order to paid (placeholder for payment)
// @access  Private
router.put('/:id/pay', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = { // Dummy payment result
            id: req.body.id || 'dummy_payment_id',
            status: req.body.status || 'COMPLETED',
            update_time: req.body.update_time || Date.now(),
            email_address: req.body.email_address || req.user.email,
        };
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
  } catch(error) {
     res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;