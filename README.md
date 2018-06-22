# OPSkins ExpressTrade API for Node.js

This module provides easy interaction with the OPSkins ExpressTrade API. It provides a basic schema of the API to perform simple checks on the required inputs, and it automatically adds the 2FA token if required.

All you need to run a bot is your API key and the secret of your 2FA registered with your OPSkins account.


# Installation

```shell
npm i expresstrade --save
```


# Usage

```javascript
var ExpressTrade = require('expresstrade')

var ET = new ExpressTrade({
  apikey: 'Your OPSkins API Key',
  twofactorsecret: 'Your OPSkins 2FA Secret',
  pollInterval: 5000
})

ET.IUser.GetInventory((err, body) => {
  // ...
})

ET.ITrade.SendOfferToSteamId({steam_id: '76561197982275081', items: '1234,5678'}, (err, body) => {
  // ...
})

ET.on('offerReceived', (_event, _offer) => {
  console.log(_event, _offer.id)

  ET.ITrade.CancelOffer({offer_id: _offer.id})
})
```


## Syntax

You can either address the methods as object properties like this:

```javascript
ET.IUser.GetInventory((err, body) => {
  // ...
})
```

or address the path like this:

```javascript
ET.request('IUser/GetInventory', ((err, body) => {
  // ...
})
```


## Request Methods (GET/POST)

The required methods are saved in the API schema and node-expresstrade handles the conversion for GET (query string) and POST (form) on its own.

node-expresstrade accepts any JSON object containin the data.


# Events

If `pollInterval` is set, node-expresstrade will poll for changes. If any new or changed offers are detected, an event will be emitted.

### any

* `event` - The event type
* `offer` - A [Standard Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted on any event.


### offerSent

* `offer` - A [Standard Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted when an offer has been sent out. The offer is active and the recipient can accept it to exchange the items.


### offerReceived

* `offer` - A [Standard Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted when an offer was received. The offer is active and you can accept it to exchange the items.


### offerAccepted

* `offer` - A [Standard Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted when an offer has been accepted. The recipient accepted the offer and items were exchanged.


### offerExpired

* `offer` - A [Standard Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted when an offer has expired. The offer expired from inactivity.


### offerCancelled

* `offer` - A [Standard Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted when an offer was cancelled. The sender cancelled the offer.


### offerDeclined

* `offer` - A [Standard Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted when an offer has been declined. The recipient declined the offer.


### offerNoLongerValid

* `offer` - A [Standard Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted when an offer is no longer valid. One of the items in the offer is no longer available/eligible so the offer was cancelled automatically.
