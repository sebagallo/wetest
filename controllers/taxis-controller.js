const models = require('../database/models');
const { logger } = require('../helpers/logger');

exports.getTaxisList = async (request, response) => {
  response.send(await models.Taxi.find());
};

exports.getTaxi = async (request, response) => {
  response.send(await models.Taxi.findById(request.params.id));
};

exports.updateTaxiPosition = async (request, response) => {
  if (request.body.location
    && Array.isArray(request.body.location)
    && request.body.location.length === 2) {
    const taxiToStore = {
      location: {
        type: 'Point',
        coordinates: request.body.location,
      },
    };
    await response.send(await models.Taxi.updateOne(
      { _id: request.params.id },
      taxiToStore,
    ));
    await updateQueue(taxiToStore, request);
  } else {
    throw new Error('Invalid Parameters');
  }
};

/**
 * @param taxiToStore
 * @param request
 */
async function updateQueue(taxiToStore, request) {
  // aggiungo al parcheggio che si interseca con la posizione
  const parking = await models.Parking.findOneAndUpdate({
    location: {
      $geoIntersects: {
        $geometry: taxiToStore.location,
      },
    },
  },
  { $addToSet: { queue: { taxi: request.params.id } } });
  // se ho aggiunto al parcheggio, cerco e rimuovo da altro parcheggio se presente
  if (parking) {
    await models.Parking.findOneAndUpdate({
      _id: { $ne: parking._id },
    },
    {
      $pull: { queue: { taxi: request.params.id } },
    });
  } else { // se non ho aggiunto, rimuovo da altri parcheggi se presente
    await models.Parking.findOneAndUpdate({
      $pull: { queue: { taxi: request.params.id } },
    });
  }
}

exports.giveBonusToTaxi = async (request, response) => {
  if (request.body.expires) {
    const expireDate = new Date(request.body.expires);
    if (expireDate) {
      const parking = await models.Parking.findOne({ queue: { $elemMatch: { taxi: request.params.id } } });
      if (parking) {
        const match = parking.queue.find((element) => element.taxi == request.params.id);
        match.bonus = expireDate;
        response.send(await models.Parking.updateOne(parking));
      } else {
        throw new Error('Parking not found');
      }
    }
  } else {
    throw new Error('Invalid Date');
  }
};
