//
// https://github.com/TheTimmaeh/node-expresstrade
//

var ExpressTrade = require('../index')

var ET = new ExpressTrade({
  apiurl: 'https://api-trade.opskins.com/%s/%s/v1/',
  apikey: 'Your API Key',
  twofactorsecret: 'Your 2FA Secret'
})

ET.IUser.GetInventory((err, res) => {
  console.log(err, res);
})

//
// Also available via ET.request:
//

ET.request('IUser/GetInventory', (err, res) => {
  console.log(err, res);
})
