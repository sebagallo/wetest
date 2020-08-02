const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  taxi: { type: mongoose.ObjectId, ref: 'Taxi' },
  bonus: Date,
});

module.exports = {
  model: mongoose.model('Queue', queueSchema),
  schema: queueSchema,
};
