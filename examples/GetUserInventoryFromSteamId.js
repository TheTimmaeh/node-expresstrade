//
// https://github.com/TheTimmaeh/node-expresstrade
//

var ExpressTrade = require('../index')

var ET = new ExpressTrade({
  apiurl: 'https://api-trade.opskins.com/%s/%s/v1/',
  apikey: 'Your API Key',
  twofactorsecret: 'Your 2FA Secret'
})

ET.ITrade.GetUserInventoryFromSteamId({steam_id: '76561197982275081'}, (err, res) => {
  console.log(err, res);
})

//
// Also available via ET.request:
//

ET.request('ITrade/GetUserInventoryFromSteamId', {steam_id: '76561197982275081'}, (err, res) => {
  console.log(err, res);
})
