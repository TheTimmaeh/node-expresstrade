# OPSkins ExpressTrade API for Node.js

This module provides easy interaction with the OPSkins ExpressTrade API. It provides a basic schema of the API to perform simple checks on the required inputs, and it automatically adds the 2FA token if required.

All you need to run a bot is your API key and the secret of your 2FA registered with your OPSkins account.


# Installation

```shell
npm install expresstrade --save
```


# Usage

```javascript
var ExpressTrade = require('expresstrade')

var ET = new ExpressTrade({
  apiurl: 'https://api-trade.opskins.com/%s/%s/v1/',
  apikey: 'Your OPSkins API Key',
  twofactorsecret: 'Your OPSkins 2FA Secret'
})

ET.IUser.GetInventory((err, body) => {
  // ...
})

ET.ITrade.SendOfferToSteamId({steam_id: '76561197982275081', items: '1234,5678'}, (err, body) => {
  // ...
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


## Methods (GET/POST)

The required methods are saved in the API schema and ExpressTrade handles the conversion for GET (query string) and POST (form) on its own.

ExpressTrade accepts any JSON object containin the data.
