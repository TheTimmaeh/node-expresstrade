//
// https://github.com/TheTimmaeh/node-expresstrade
//

var ExpressTrade = require('../index')

var ET = new ExpressTrade({
  apikey: 'Your API Key',
  twofactorsecret: 'Your 2FA Secret'
})

ET.ITrade.SendOfferToSteamId({steam_id: '76561197982275081', items: '1234'}, (err, res) => {
  console.log(err, res);
})

//
// Also available via ET.request:
//

ET.request('ITrade/SendOfferToSteamId', {steam_id: '76561197982275081', items: '1234'}, (err, res) => {
  console.log(err, res);
})
