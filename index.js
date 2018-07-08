const twoFactor = require('node-2fa'),
      request = require('request'),
      events = require('events'),
      util = require('util'),
      querystring = require('querystring')

var schema = require('./resources/schema')

var ExpressTrade = (() => {

  // Constructor
  function ExpressTrade(options){

    // Check for Options
    if(typeof options !== 'object'){
      console.log('expresstrade | Options missing.')
      return
    }

    if(!options.apikey){
      console.log('expresstrade | API Key missing.')
      return
    }

    // Options
    this.options = Object.assign({
      apiurl: 'https://api-trade.opskins.com/%s/%s/v1/',
      pollInterval: -1
    }, options)

    // API Schema
    this.schema = schema

    for(let _interface in schema){
      this[_interface] = {}
      for(let _method in schema[_interface]) this[_interface][_method] = (_data, _callback) => {
        this.request([_interface, _method].join('/'), _data, _callback)
      }
    }

    // Broadcast Events
    function broadcast(_event, _offer){
      that.emit(_event, _offer)
      that.emit('any', _event, _offer)
    }

    // Events
    if(options.pollInterval > -1){
      this.pollData = {}
      var that = this
      startPolling(options.pollInterval)
    }

    // Start Polling
    function startPolling(_interval){

      // Apply min Interval Time
      if(_interval < 1000) _interval = 1000

      that.polling = setInterval(() => {
        that.ITrade.GetOffers((err, res) => {
          if(err){
            console.log(err)
            return
          }

          if(res.status){
            var _pollData = {}

            // First time filling pollData
            if(Object.keys(that.pollData).length < 1){
              for(var offer in res.response.offers) _pollData[res.response.offers[offer].id] = res.response.offers[offer]
              that.pollData = Object.assign({}, _pollData)
              return
            }

            // No valid response
            if(!res.response || !res.response.offers){
              console.log('expresstrade | Couldnt poll for offers, maybe using vCaseSite API key?')
              return
            }

            // Compare old to new pollData
            for(var offer in res.response.offers){
              _pollData[res.response.offers[offer].id] = res.response.offers[offer]

              // New Offer
              if(!that.pollData[res.response.offers[offer].id]){
                if(res.response.offers[offer].sent_by_you) broadcast('offerSent', res.response.offers[offer])
                else broadcast('offerReceived', res.response.offers[offer])

              // Existing Offer, different State
              } else if(that.pollData[res.response.offers[offer].id].state !== res.response.offers[offer].state){

                switch(res.response.offers[offer].state){
                  case 3:
                    broadcast('offerAccepted', res.response.offers[offer])
                    break
                  case 5:
                    broadcast('offerExpired', res.response.offers[offer])
                    break
                  case 6:
                    broadcast('offerCancelled', res.response.offers[offer])
                    break
                  case 7:
                    broadcast('offerDeclined', res.response.offers[offer])
                    break
                  case 8:
                    broadcast('offerNoLongerValid', res.response.offers[offer])
                    break
                  case 9:
                    broadcast('caseOpenPending', res.response.offers[offer])
                    break
                  case 10:
                    broadcast('caseOpenExpired', res.response.offers[offer])
                    break
                  case 12:
                    broadcast('caseOpenFailed', res.response.offers[offer])
                    break
                }
              }
            }

            // Save new pollData
            that.pollData = Object.assign({}, _pollData)
          }
        })
      }, _interval)
    }

    // API Request Function
    this.request = (_path, _data, _callback) => {

      // Split Path to Interface & Method
      var [ _interface, _method ] = _path.split('/')

      // Check for Interface & Method
      if(!_interface || !_method || !this.schema[_interface] || !this.schema[_interface][_method]) return

      // Default Options for Requests
      var options = {
        auth: {
          user: this.options.apikey
        },
        url: util.format(this.options.apiurl, _interface, _method)
      }

      // Check for Method (GET/POST)
      if(!!this.schema[_interface][_method].method) options.method = this.schema[_interface][_method].method

      // Create Data Object
      if(typeof _data === 'function') _callback = _data, _data = {}
      else if(typeof _data !== 'object') _data = {}
      var data = Object.assign({}, (this.schema[_interface][_method].data || {}), _data)

      // Check for required Data Fields
      if(typeof this.schema[_interface][_method].fields === 'object'){

        // Generate 2FA Code if required
        if(this.schema[_interface][_method].fields.twofactor_code === 1) data.twofactor_code = this.generateToken()

        // Stop Execution if required Data Field is missing
        for(var field in this.schema[_interface][_method].fields) if(this.schema[_interface][_method].fields[field] === 1 && !data[field]){
          console.log('expresstrade | ' + _path + ': Missing Input ' + field)
          return
        }
      }

      // Convert Data Object into required Format
      if(Object.keys(data).length > 0){

        // Convert Data Object into GET format
        if(!options.method || options.method === 'GET') options.url = options.url + '?' + querystring.stringify(data)

        // Convert Data Object into POST format
        else options.form = data
      }

      // Create Callback Function
      var callback = _callback || this.schema[_interface][_method].callback || (() => {})

      // Perform Request
      request(options, (error, response, body) => {

        // Convert Body to JSON
        try {
          body = JSON.parse(body)
        } catch(e){}

        // Execute Callback Function
        callback(error, body, response)
      })
    }

    // Generate 2FA Token
    this.generateToken = (i = 0) => {

      if(!this.options.twofactorsecret){
        console.log('expresstrade | Two Factor Secret missing, aborting.')
        return
      }

      if(i > 10){
        console.log('expresstrade | Error: Could not generate valid token after 10 tries.')
        return
      }

      var { token } = twoFactor.generateToken(this.options.twofactorsecret)
      var { delta } = twoFactor.verifyToken(this.options.twofactorsecret, token)

      if(delta == 0) return token
      return this.generateToken(i++)
    }
  }

  return ExpressTrade

})()

ExpressTrade.prototype = new events.EventEmitter
module.exports = ExpressTrade
