const mongoose = require('mongoose');

const polygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Polygon'],
    required: true,
  },
  coordinates: {
    type: [[[Number]]],
    required: true,
  },
});

module.exports = {
  model: mongoose.model('Polygon', polygonSchema),
  schema: polygonSchema,
};
