# OPSkins ExpressTrade API for Node.js

This module provides easy interaction with the OPSkins ExpressTrade API. It provides a basic schema of the API to perform simple checks on the required inputs, and it automatically adds the 2FA token if required.

All you need to run a bot is your API key and the secret of your 2FA registered with your OPSkins account.


# Installation

```shell
npm install @thetimmaeh/expresstrade --save
```


# Usage

```javascript
var ExpressTrade = require('./lib/expresstrade.js')

var ET = new ExpressTrade({
  apiurl: 'https://api-trade.opskins.com/%s/%s/v1/',
  apikey: 'Your OPSkins API Key',
  twofactorsecret: 'Your OPSkins 2FA Secret'
})

ET.request('IUser/GetInventory', (err, body) => {
  // ...
})

ET.request('ITrade/SendOfferToSteamId', {steam_id: '76561197982275081', items: '1234,5678'}, (err, body) => {
  // ...
})
```
