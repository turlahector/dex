import ls from "./localStorage";
import {cryptoBridgeAPIs} from "api/apiConfig";
const blockTradesStorage = new ls("");

export function fetchCoins(url = (cryptoBridgeAPIs.BASE + cryptoBridgeAPIs.COINS_LIST)) {
    return fetch(url).then(reply => reply.json().then(result => {
        return result;
    })).catch(err => {
        console.log("error fetching blocktrades list of coins", err, url);
    });
}

export function fetchCoinsSimple(url = (cryptoBridgeAPIs.BASE + cryptoBridgeAPIs.COINS_LIST)) {
    return fetch(url).then(reply => reply.json().then(result => {
        return result;
    })).catch(err => {
        console.log("error fetching simple list of coins", err, url);
    });
}

export function fetchBridgeCoins(baseurl = (cryptoBridgeAPIs.BASE)) {
    let url = cryptoBridgeAPIs.BASE + cryptoBridgeAPIs.TRADING_PAIRS;
    return fetch(url, {method: "get", headers: new Headers({"Accept": "application/json"})}).then(reply => reply.json().then(result => {
        return result;
    })).catch(err => {
        console.log("error fetching blocktrades list of coins", err, url);
    });
}

export function getDepositLimit(inputCoin, outputCoin, url = (cryptoBridgeAPIs.BASE + cryptoBridgeAPIs.DEPOSIT_LIMIT)) {
    return fetch(url + "?inputCoinType=" + encodeURIComponent(inputCoin) + "&outputCoinType=" + encodeURIComponent(outputCoin),
         {method: "get", headers: new Headers({"Accept": "application/json"})}).then(reply => reply.json().then(result => {
        return result;
    })).catch(err => {
        console.log("error fetching deposit limit of", inputCoin, outputCoin, err);
    });
}

export function estimateOutput(inputAmount, inputCoin, outputCoin, url = (cryptoBridgeAPIs.BASE + cryptoBridgeAPIs.ESTIMATE_OUTPUT)) {
    return fetch(url + "?inputAmount=" + encodeURIComponent(inputAmount) +"&inputCoinType=" + encodeURIComponent(inputCoin) + "&outputCoinType=" + encodeURIComponent(outputCoin),
         {method: "get", headers: new Headers({"Accept": "application/json"})}).then(reply => reply.json().then(result => {
        return result;
    })).catch(err => {
        console.log("error fetching deposit limit of", inputCoin, outputCoin, err);
    });
}

export function getActiveWallets(url = (cryptoBridgeAPIs.BASE + cryptoBridgeAPIs.ACTIVE_WALLETS)) {
    return fetch(url).then(reply => reply.json().then(result => {
        return result;
    })).catch(err => {
        console.log("error fetching blocktrades active wallets", err, url);
    });
}

export function estimateInput(outputAmount, inputCoin, outputCoin, url = (blockTradesAPIs.BASE + blockTradesAPIs.ESTIMATE_INPUT)) {
    return fetch(url + "?outputAmount=" + encodeURIComponent(outputAmount) +"&inputCoinType=" + encodeURIComponent(inputCoin) + "&outputCoinType=" + encodeURIComponent(outputCoin), {
        method: "get", headers: new Headers({"Accept": "application/json"})}).then(reply => reply.json().then(result => {
            return result;
        })).catch(err => {
            console.log("error fetching deposit limit of", inputCoin, outputCoin, err);
        });
}


export function requestDepositAddress({inputCoinType, outputCoinType, outputAddress, url = cryptoBridgeAPIs.BASE, stateCallback}) {
    let body = {
        inputCoinType,
        outputCoinType,
        outputAddress
    };

    let body_string = JSON.stringify(body);

    fetch( url + "/simple-api/initiate-trade", {
        method:"post",
        headers: new Headers( { "Accept": "application/json", "Content-Type":"application/json" } ),
        body: body_string
    }).then( reply => { reply.json()
        .then( json => {
            // console.log( "reply: ", json )
            let address = {"address": json.inputAddress || "unknown", "memo": json.inputMemo, error: json.error || null};
            if (stateCallback) stateCallback(address);
        }, error => {
            // console.log( "error: ",error  );
            if (stateCallback) stateCallback({"address": "unknown", "memo": null});
        });
    }, error => {
        // console.log( "error: ",error  );
        if (stateCallback) stateCallback({"address": "unknown", "memo": null});
    }).catch(err => {
        console.log("fetch error:", err);
    });
}

export function getBackedCoins({allCoins, tradingPairs, backer}) {
    let coins_by_type = {};
    allCoins.forEach(coin_type => coins_by_type[coin_type.coinType] = coin_type);
    allCoins.forEach(coin_type => coins_by_type[coin_type.backingCoinType] = coin_type);

    let allowed_outputs_by_input = {};
    tradingPairs.forEach(pair => {
        if (!allowed_outputs_by_input[pair.inputCoinType])
            allowed_outputs_by_input[pair.inputCoinType] = {};
        allowed_outputs_by_input[pair.inputCoinType][pair.outputCoinType] = true;
    });


    let blocktradesBackedCoins = [];
    allCoins.forEach(coin_type => {
        if (coin_type.walletSymbol.startsWith(backer + ".") && coin_type.backingCoinType && coins_by_type[coin_type.backingCoinType]) {
            let isDepositAllowed = allowed_outputs_by_input[coin_type.backingCoinType] && allowed_outputs_by_input[coin_type.backingCoinType][coin_type.coinType];
            let isWithdrawalAllowed = allowed_outputs_by_input[coin_type.coinType] && allowed_outputs_by_input[coin_type.coinType][coin_type.backingCoinType];


            blocktradesBackedCoins.push({
                name: coins_by_type[coin_type.backingCoinType].name,
                intermediateAccount: coins_by_type[coin_type.backingCoinType].intermediateAccount,
                gateFee: coins_by_type[coin_type.backingCoinType].gateFee,
                walletType: coins_by_type[coin_type.backingCoinType].walletType,
                backingCoinType: coins_by_type[coin_type.backingCoinType].walletSymbol,
                symbol: coin_type.walletSymbol,
                transactionFee: coin_type.transactionFee,
                supportsMemos: coins_by_type[coin_type.backingCoinType].supportsOutputMemos,
                depositAllowed: isDepositAllowed,
                withdrawalAllowed: isWithdrawalAllowed
            });
        }});
    return blocktradesBackedCoins;
}

export function validateAddress({url = cryptoBridgeAPIs.BASE, walletType, newAddress, output_coin_type}) {
    if (!newAddress) return new Promise((res) => res());
    return fetch(
        url + "/wallets/" + walletType + "/address-validator?address=" + encodeURIComponent(newAddress) + "&outputCoinType=" + output_coin_type,
        {
            method: "get",
            headers: new Headers({"Accept": "application/json"})
        }).then(reply => reply.json().then( json => json.isValid))
        .catch(err => {
            console.log("validate error:", err);
        })
}

function hasWithdrawalAddress(wallet) {
    return blockTradesStorage.has(`history_address_${wallet}`);
}

function setWithdrawalAddresses({wallet, addresses}) {
    blockTradesStorage.set(`history_address_${wallet}`, addresses);
}

function getWithdrawalAddresses(wallet) {
    return blockTradesStorage.get(`history_address_${wallet}`, []);
}

function setLastWithdrawalAddress({wallet, address}) {
    blockTradesStorage.set(`history_address_last_${wallet}`, address);
}

function getLastWithdrawalAddress(wallet) {
    return blockTradesStorage.get(`history_address_last_${wallet}`, "");
}

export const WithdrawAddresses = {
    has: hasWithdrawalAddress,
    set: setWithdrawalAddresses,
    get: getWithdrawalAddresses,
    setLast: setLastWithdrawalAddress,
    getLast: getLastWithdrawalAddress
};
