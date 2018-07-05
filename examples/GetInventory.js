//
// https://github.com/TheTimmaeh/node-expresstrade
//

var ExpressTrade = require('../index')

var ET = new ExpressTrade({
  apikey: 'Your API Key',
  twofactorsecret: 'Your 2FA Secret'
})

ET.IUser.GetInventory({app_id: 1}, (err, res) => {
  console.log(err, res)
})

//
// Also available via ET.request:
//

ET.request('IUser/GetInventory', {app_id: 1}, (err, res) => {
  console.log(err, res)
})
