const express = require('express');
const router = express.Router();
const Warranty = require('../models/Warranty');

// @route   GET /api/warranty
// @desc    Get warranty info by regNo and brand
router.get('/', async (req, res) => {
  const { regNo, brand } = req.query;

  if (!regNo || !brand) {
    return res.status(400).json({ message: 'Please provide both regNo and brand' });
  }

  try {
    const warranty = await Warranty.findOne({ regNo, brand });

    if (!warranty) {
      return res.status(404).json({ message: 'No warranty found with that registration number and brand' });
    }

    // Calculate warranty expiry date
    const purchaseDate = new Date(warranty.purchaseDate);
    const expiryDate = new Date(purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + warranty.warrantyPeriodMonths);

    const isExpired = new Date() > expiryDate;

    res.json({
      regNo: warranty.regNo,
      brand: warranty.brand,
      model: warranty.model,
      purchaseDate: purchaseDate.toDateString(),
      warrantyExpiresOn: expiryDate.toDateString(),
      isExpired,
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
