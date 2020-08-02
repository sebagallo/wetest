# WE-TEST

This application simulates a parking system working through geolocalization.
The database is seeded with 2 parkings and 20~ taxis.

## Prerequisites

- MongoDB 4.4
- Node 14

## Methods

|Method| |Description|Payload|
|---|---|---|---|
|/parkings|GET|Get a list of Parkings and their queues|
|/parkings/:id|GET|Get a single Parking and its queue|
|/taxis|GET|Get a list of Taxis|
|/taxis/:id|GET|Get a single Taxi|
|/taxis/:id/position|POST|Update a taxi position by providing LL and LT|{location:['10','10']}
|/taxis/:id/bonus|POST|Give a 'bonus' to a taxi by setting the bonus' expiration date|{expires:Date}

### Things to know

- You can check the provided parkings' geolocalization by checking each parking.
- The date format is any JS date, but it's preferred to use this format: 2020-08-02T14:25:43.511Z

## Known Issues

1. The taxi position should be communicated using an encrypted token
2. There is no error handling (the client might hang waiting for a response if the params provided are invalid)
3. There are no unit tests
4. The Queue should be its own collection instead of being inside the parkings collection
