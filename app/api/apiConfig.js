export const blockTradesAPIs = {
    BASE: "https://api.blocktrades.us/v2",
    // BASE_OL: "https://api.blocktrades.us/ol/v2",
    BASE_OL: "https://ol-api1.openledger.info/api/v0/ol/support",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/active-wallets",
    TRADING_PAIRS: "/trading-pairs",
    DEPOSIT_LIMIT: "/deposit-limits",
    ESTIMATE_OUTPUT: "/estimate-output-amount",
    ESTIMATE_INPUT: "/estimate-input-amount"
};

export const rudexAPIs = {
    BASE: "https://gateway.rudex.org/api/v0_1",
    COINS_LIST: "/coins",
    NEW_DEPOSIT_ADDRESS: "/new-deposit-address"
};

export const cryptoBridgeAPIs = {
    BASE: "https://api.crypto-bridge.org/api/v1",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/wallets",
    TRADING_PAIRS: "/trading-pairs",
};

export const settingsAPIs = {
    DEFAULT_WS_NODE: "wss://fake.automatic-selection.com",
    WS_NODE_LIST: [
       {url: "wss://fake.automatic-selection.com", location: {translate: "settings.api_closest"}},
       {url: "ws://127.0.0.1:8090", location: "Locally hosted"},
       {url: "wss://bitshares.openledger.info/ws", location: "Nuremberg, Germany"},
       {url: "wss://eu.openledger.info/ws", location: "Berlin, Germany"},
       {url: "wss://bit.btsabc.org/ws", location: "Hong Kong"},
       {url: "wss://bts.ai.la/ws", location: "Hong Kong"},
       {url: "wss://bitshares.apasia.tech/ws", location: "Bangkok, Thailand"},
       {url: "wss://japan.bitshares.apasia.tech/ws", location: "Tokyo, Japan"},
       {url: "wss://bitshares.dacplay.org/ws", location:  "Hangzhou, China"},
       {url: "wss://bitshares-api.wancloud.io/ws", location:  "China"},
       {url: "wss://openledger.hk/ws", location: "Hong Kong"},
       {url: "wss://bitshares.crypto.fans/ws", location: "Munich, Germany"},
       {url: "wss://ws.gdex.top", location: "China"},
       {url: "wss://dex.rnglab.org", location: "Netherlands"},
       {url: "wss://dexnode.net/ws", location: "Dallas, USA"},
       {url: "wss://kc-us-dex.xeldal.com/ws", location: "Kansas City, USA"},
       {url: "wss://la.dexnode.net/ws", location: "Los Angeles, USA"},
       {url: "wss://btsza.co.za:8091/ws", location: "Cape Town, South Africa"},
       {url: "wss://api.bts.blckchnd.com", location: "Germany"}
   ],
    DEFAULT_FAUCET: "https://api.crypto-bridge.org",
    TESTNET_FAUCET: "https://faucet.testnet.bitshares.eu",
    RPC_URL: "https://openledger.info/api/"
};
