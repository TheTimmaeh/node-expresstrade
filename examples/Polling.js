//
// https://github.com/TheTimmaeh/node-expresstrade
//

var ExpressTrade = require('../index')

var ET = new ExpressTrade({
  apikey: 'Your API Key',
  twofactorsecret: 'Your 2FA Secret',
  pollInterval: 5000
})

ET.on('any', (_event, _offer) => {
  console.log(_event, _offer.id)
})
