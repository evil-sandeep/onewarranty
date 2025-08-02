const express = require('express');
const router = express.Router();
const Warranty = require('../models/Warranty');

router.get('/:regNo', async (req, res) => {
  try {
    const warranty = await Warranty.findOne({ regNo: req.params.regNo });
    if (!warranty) {
      return res.status(404).json({ message: 'Warranty not found' });
    }

    // Calculate warranty status
    const purchaseDate = new Date(warranty.purchaseDate);
    const expiryDate = new Date(purchaseDate);
    expiryDate.setMonth(purchaseDate.getMonth() + warranty.warrantyPeriodMonths);

    const isExpired = new Date() > expiryDate;

    res.json({
      ...warranty._doc,
      expiryDate,
      status: isExpired ? 'Expired' : 'Active',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
