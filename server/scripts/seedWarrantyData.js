const mongoose = require('mongoose');
const Warranty = require('../models/Warranty');
const data = require('../data/warrantyData.json');

mongoose
  .connect('mongodb://localhost:27017/warrantyDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('MongoDB connected');
    await Warranty.deleteMany(); // Optional: clean old data
    await Warranty.insertMany(data);
    console.log('Warranty data seeded!');
    mongoose.disconnect();
  })
  .catch((err) => console.log(err));
