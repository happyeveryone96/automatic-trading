const request = require('request')
const uuidv4 = require("uuid/v4")
const crypto = require('crypto')
const sign = require('jsonwebtoken').sign
const queryEncode = require("querystring").encode

const access_key = "" // 발급받은 Access key 입력
const secret_key = "" // 발급받은 Secret key 입력
const server_url = "https://api.upbit.com"

const body = {
    market: 'KRW-BTC',
    side: 'bid', // bid : 매수   ask : 매도
    volume: '0.0001', // 수량
    price: '61811000', // 매수가격
    ord_type: 'limit', /* limit : 지정가 주문  price : 시장가 주문(매수) 
                          market : 시장가 주문(매도) */
}

const query = queryEncode(body)

const hash = crypto.createHash('sha512')
const queryHash = hash.update(query, 'utf-8').digest('hex')

const payload = {
    access_key: access_key,
    nonce: uuidv4(),
    query_hash: queryHash,
    query_hash_alg: 'SHA512',
}

const token = sign(payload, secret_key)

const options = {
    method: "POST",
    url: server_url + "/v1/orders",
    headers: {Authorization: `Bearer ${token}`},
    json: body
}

request(options, (error, response, body) => {
    if (error) throw new Error(error)
    console.log(body)
})
