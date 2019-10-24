'use strict'
console.error('\n=====RUN-TEST-REGISTERACCOUNTTX-START=====\n')
var WiccApi = require('../index');

//environment init 
//环境初始化
var arg = {network: 'testnet'}
var wiccApi = new WiccApi(arg)

//import private key
//引入私钥
var privateKey = WiccApi.PrivateKey.fromWIF('Y5Lrutj2nJmmCVJ9hmTmNyASJxUACu9b8djoobrHmoGye3uhXnrb')
var publicKey = privateKey.toPublicKey();

/*
Build a transaction for register account
note:
1, nValidHeight: the height of the block when creating the signature, and the height difference when submitting the broadcast transaction must be <=250
2, fees: handling fee when registering a account, >= 100000000 sawi (0.1 wicc)
3. The same transaction cannot be submitted repeatedly before it is confirmed(BPS=0.1). It is recommended to solve the problem of batch initiated transaction by adding random handling fee.
*/
/*
构建注册地址的交易单
注意：
1、nValidHeight:创建签名时的区块高度,与提交广播交易时的高度差必须 <=250
2、fees:注册账户交易时的手续费, >= 10000 sawi(0.0001 wicc)
3、相同的交易在未被确认前不能重复提交(BPS=0.1),建议采用添加随机手续费方式解决批量发起交易问题
*/
var registeraccounttxInfo = {
    nTxType: 2,         //REGISTER_ACCOUNT_TX
    nVersion: 1,
    nValidHeight: 34632,  
    fees: 10000,
    pubkey: publicKey.toString(),
    minerPubkey: ''
  };

var rawtx = wiccApi.createSignTransaction(privateKey, WiccApi.REGISTER_ACCOUNT_TX, registeraccounttxInfo)
console.log("genregisteraccountraw rawtx=")
console.log(rawtx)
console.error('\n=====RUN-TEST-REGISTERACCOUNTTX-END=====\n')