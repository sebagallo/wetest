const mongoose = require('mongoose');
const Polygon = require('./polygon');
const Queue = require('./queue');

const parkingSchema = new mongoose.Schema({
  name: String,
  location: {
    type: Polygon.schema,
    required: true,
  },
  queue: [Queue.schema],
});

module.exports = {
  model: mongoose.model('Parking', parkingSchema),
  schema: parkingSchema,
};
