# WE-TEST

This application simulates a parking system working through geolocalization.
The database is seeded with 2 parkings and 20~ taxis.

## Prerequisites

- MongoDB 4.4
- Node 14

## Methods

|Method|Description|
|---|---|
|/parkings|Get a list of Parkings|
|/parkings/:id|Get a single Parking|
|/taxis|Get a list of Taxis|
|/taxis/:id|Get a single Taxi|
|/taxis/:id/position|Update a taxi position|
|/taxis/:id/bonus|Give a 'bonus' to a taxi|

## Known Issues

1. The taxi position should be communicated using an encrypted token
2. There is no error handling (the client might hang waiting for a response if the params provided are invalid)
3. There are no unit tests
