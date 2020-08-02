const mongoose = require('mongoose');

const Point = require('./point');

const taxiSchema = new mongoose.Schema({
  name: String,
  location: Point.schema,
});

module.exports = {
  model: mongoose.model('Taxi', taxiSchema),
  schema: taxiSchema,
};
