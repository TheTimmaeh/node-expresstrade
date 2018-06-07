var schema = {
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

module.exports = schema
