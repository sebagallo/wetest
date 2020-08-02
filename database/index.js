const mongoose = require('mongoose');
const { readFileSync } = require('fs');
const config = require('./config');
const models = require('./models');

const { logger } = require('../helpers/logger');

const connect = () => mongoose.connect(config.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  // user: config.user,
  // pass: config.pass,
});

mongoose.connection.on('connecting', () => {
  logger.info('Connecting to MongoDB...');
});

mongoose.connection.on('connected', () => {
  logger.info('MongoDB Succesfully Connected');
});

mongoose.connection.on('error', (error) => {
  logger.error(`MongoDB Connection Error: ${error}`);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB Disconnected');
});

mongoose.connection.once('open', () => {
  logger.info('MongoDB Connection Opened!');
});

mongoose.connection.on('reconnected', () => {
  logger.info('MongoDB Reconnected!');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

(async () => {
  await connect();
  // await models.Parking.collection.drop();
  const currentParkings = await models.Parking.find();
  if (currentParkings.length === 0) {
    logger.info('Seeding DB Parkings...');
    const parkingsData = JSON.parse(await readFileSync('./database/resources/parkings.json'));
    await models.Parking.insertMany(parkingsData);
  }
  // await models.Taxi.collection.drop();
  const currentTaxis = await models.Taxi.find();
  if (currentTaxis.length === 0) {
    logger.info('Seeding DB Taxis...');
    const taxisData = JSON.parse(await readFileSync('./database/resources/taxis.json'));
    await models.Taxi.insertMany(taxisData);
  }
})();
