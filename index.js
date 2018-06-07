var twoFactor = require('node-2fa')
var request = require('request')
var util = require('util')
var querystring = require('querystring')

var ExpressTrade = (() => {

  // Constructor
  function ExpressTrade(options){

    // Check for Options
    if(typeof options !== 'object'){
      console.log('Options missing.')
      return
    }
    if(typeof options.apiurl === 'undefined'){
      console.log('API URL missing.')
      return
    }
    if(typeof options.apikey === 'undefined'){
      console.log('API Key missing.')
      return
    }
    if(typeof options.twofactorsecret === 'undefined'){
      console.log('Two Factor Secret missing.')
      return
    }

    this.options = options

    // API Schema
    this.schema = {
      IItem: {
        GetItemsById: {
          method: 'POST',
          fields: {
            item_id: 1
          }
        },
        WithdrawToOpskins: {
          method: 'POST',
          fields: {
            item_id: 1
          }
        }
      },
      ITest: {
        Test: {
          callback: (error, response, body) => {
            console.log(error, body)
          }
        },
        TestAuthed: {
          callback: (error, response, body) => {
            console.log(error, body)
          }
        },
        TestBody: {
          data: {
            foo: 'bar'
          },
          callback: (error, response, body) => {
            console.log(error, body)
          }
        }
      },
      ITrade: {
        GetApps: {},
        GetOffer: {
          fields: {
            offer_id: 1
          }
        },
        GetOffers: {
          fields: {
            uid: 0,
            state: 0,
            type: 0,
            page: 0,
            per_page: 0,
            ids: 0
          }
        },
        GetTradeURL: {},
        GetUserInventory: {
          fields: {
            uid: 1,
            app_id: 1,
            page: 0,
            per_page: 0,
            search: 0
          }
        },
        GetUserInventoryFromSteamId: {
          fields: {
            steam_id: 1,
            app_id: 1,
            page: 0,
            per_page: 0,
            search: 0
          }
        },
        AcceptOffer: {
          method: 'POST',
          fields: {
            twofactor_code: 1,
            offer_id: 1
          }
        },
        CancelOffer: {
          method: 'POST',
          fields: {
            offer_id: 1
          }
        },
        RegenerateTradeUrl: {
          method: 'POST'
        },
        SendOffer: {
          method: 'POST',
          fields: {
            twofactor_code: 1,
            uid: 1,
            token: 1,
            items: 1
          }
        },
        SendOfferToSteamId: {
          method: 'POST',
          fields: {
            twofactor_code: 1,
            steam_id: 1,
            items: 1
          }
        }
      },
      IUser: {
        GetInventory: {
          fields: {
            app_id: 1,
            page: 0,
            per_page: 0,
            search: 0,
            sort: 0
          },
          data: {
            app_id: 2,
            per_page: 100,
            sort: 1
          }
        },
        GetProfile: {
          fields: {
            with_extra: 0
          }
        }
      }
    }

    // API Request Function
    this.request = (_path, _data, _callback) => {

      // Split Path to Interface & Method
      var [ _interface, _method ] = _path.split('/')

      // Check for Interface & Method
      if(!_interface || !_method || typeof this.schema[_interface] === 'undefined' || typeof this.schema[_interface][_method] === 'undefined') return

      // Default Options for Requests
      var options = {
        auth: {
          user: this.options.apikey
        },
        url: util.format(this.options.apiurl, _interface, _method)
      }

      // Check for Method (GET/POST)
      if(typeof this.schema[_interface][_method].method !== 'undefined') options.method = this.schema[_interface][_method].method

      // Create Data Object
      if(typeof _data === 'function') _callback = _data, _data = {}
      else if(typeof _data !== 'object') _data = {}
      var data = Object.assign({}, (this.schema[_interface][_method].data || {}), _data)

      // Check for required Data Fields
      if(typeof this.schema[_interface][_method].fields === 'object'){

        // Generate 2FA Code if required
        if(this.schema[_interface][_method].fields.twofactor_code === 1) data.twofactor_code = this.generateToken()

        // Stop Execution if required Data Field is missing
        for(var field in this.schema[_interface][_method].fields) if(this.schema[_interface][_method].fields[field] === 1 && typeof data[field] === 'undefined'){
          console.log('ExpressTrade ' + _path + ': Missing Input ' + field)
          return
        }
      }

      // Convert Data Object into required Format
      if(Object.keys(data).length > 0){

        // Convert Data Object into GET format
        if(typeof options.method === 'undefined' || options.method === 'GET') options.url = options.url + '?' + querystring.stringify(data)

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

        if(i > 10){
          console.log('Error: Could not generate valid token after 10 tries.')
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

module.exports = ExpressTrade
