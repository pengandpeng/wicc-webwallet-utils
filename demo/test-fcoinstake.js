'use strict'
console.error('\n=====RUN-TEST-FCOINSTAKE-START=====\n')
// const express = require("express");
var WiccApi = require('../index');
var WriterHelper = require('../src/lib/util/writerhelper')
var privateKey = WiccApi.PrivateKey.fromWIF('Y6J4aK6Wcs4A3Ex4HXdfjJ6ZsHpNZfjaS4B9w7xqEnmFEYMqQd13')

var arg = {network: 'testnet'}
var wiccApi = new WiccApi(arg)

// 验证地址
var ret = wiccApi.validateAddress('wPcHigM3Gbtbooxyd3YyBXiMintZnfD7cE')
console.log(ret)

/*
Build a transaction for fcoin stake transfer
note:
1, nValidHeight: the height of the block when creating the signature, and the height difference when submitting the broadcast transaction must be <=250
2, fees: handling fee when deploying a smart contract, >= 10000 sawi (0.0001 wicc)
3. The same transaction cannot be submitted repeatedly before it is confirmed(BPS=0.1). It is recommended to solve the problem of batch initiated transaction by adding random handling fee.
4, txUid: operator's regid
5, fcoinsToStake: the number of coins stake
*/
/*
构建权益币质押交易的交易单
注意：
1、nValidHeight:创建签名时的区块高度,与提交广播交易时的高度差必须 <=250
2、fees:发布合约时的手续费, >= 10000 sawi(0.0001 wicc)
3、相同的交易在未被确认前不能重复提交(BPS=0.1),建议采用添加随机手续费方式解决批量发起交易问题
4、txUid:操作者的regid
5、fcoinsToStake:质押数量
*/
var fcoinStakeTxinfo = {
    nTxType: WiccApi.FCOIN_STAKE_TX,
    nVersion: 1,
    nValidHeight: 23594,
    txUid:"",
    fees: 100000,
    feeSymbol:WriterHelper.prototype.CoinType.WICC,
    stakeType:WriterHelper.prototype.BalanceOpType.ADD_FREE,
    publicKey:"03e93e7d870ce6f1c9997076c56fc24e6381c612662cd9a5a59294fac9ba7d21d7",
    fcoinsToStake: 2000000000000,
    network: 'testnet'
  };


  var cfcoinStakeTx = wiccApi.createSignTransaction(privateKey, WiccApi.FCOIN_STAKE_TX, fcoinStakeTxinfo)
  console.log("----cointransferTx----", cfcoinStakeTx)

  console.error('\n=====RUN-TEST-FCOINSTAKE-END=====\n')
