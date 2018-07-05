var schema = {
  ICase: {
    GetCaseSchema: {
      fields: {
        cases: 0
      }
    },
    GetMinimumOpenVolume: {},
    OpenWithKeys: {
      method: 'POST',
      fields: {
        case_id: 1,
        amount: 0
      }
    }
  },
  ICaseSite: {
    GetKeyCount: {
      fields: {
        steam_id: 0,
        trade_url: 0
      }
    },
    GetTradeStatus: {
      fields: {
        offer_id: 1
      }
    },
    SendKeyRequest: {
      method: 'POST',
      fields: {
        steam_id: 0,
        trade_url: 0,
        case_id: 1,
        affiliate_eth_address: 1,
        amount: 0
      }
    }
  },
  IEthereum: {
    GetContractAddress: {}
  },
  IItem: {
    GetItems: {
      fields: {
        sku_filter: 0,
        '--wear_tier_index': 0
      }
    },
    GetItemsById: {
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
        items: 1,
        message: 0
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
    CreateVCaseUser: {
      method: 'POST',
      fields: {
        site_url: 1,
        display_name: 1
      }
    },
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
    },
    UpdateProfile: {
      method: 'POST',
      fields: {
        display_name: 1,
        inventory_is_private: 1,
        allow_twofactor_code_reuse: 1
      }
    }
  }
}

module.exports = schema
