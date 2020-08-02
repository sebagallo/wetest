const models = require('../database/models');

exports.getParkingsList = async (request, response) => {
  response.send(applyBonusToQueueList(await models.Parking.find()));
};

exports.getParking = async (request, response) => {
  response.send(applyBonusToQueue(await models.Parking.findById(request.params.id)));
};

/**
 * @param parkingList
 */
function applyBonusToQueueList(parkingList) {
  parkingList.forEach((element) => applyBonusToQueue(element));
  return parkingList;
}

/**
 * @param parking
 */
function applyBonusToQueue(parking) {
  parking.queue.sort((first, second) => {
    if (first.bonus >= Date.now()) {
      return -1;
    }
    return 0;
  });
  return parking;
}
