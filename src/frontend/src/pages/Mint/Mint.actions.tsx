import { AccountId, CustomFee, CustomFixedFee, CustomFractionalFee, CustomRoyaltyFee, Hbar, HbarUnit, PublicKey, TokenCreateTransaction, TokenMintTransaction, TokenSupplyType, TokenType, Transaction, TransactionId, TransactionReceipt } from '@hashgraph/sdk';
import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { ERROR, SUCCESS } from 'app/App.components/Toaster/Toaster.constants'
import { HashConnect, MessageTypes } from 'hashconnect';
import { State } from 'reducers'

export const FETCH_METADATA_REQUEST = 'FETCH_METADATA_REQUEST'
export const FETCH_METADATA_RESULT = 'FETCH_METADATA_RESULT'
export const FETCH_METADATA_ERROR = 'FETCH_METADATA_ERROR'
export const fetchMetadata = (address: string) => async (dispatch: any, getState: any) => {
  const state: State = getState()

  if (!address) {
    dispatch(showToaster(ERROR, 'Contract not found', 'Please return to homepage'))
    return
  }

  try {
    dispatch({
      type: FETCH_METADATA_REQUEST,
    })

    // TODO

    dispatch({
      type: FETCH_METADATA_RESULT,
      metadata: {},
    })
  } catch (error: any) {
    console.error(error)
    dispatch(showToaster(ERROR, 'Error', error.message))
    dispatch({
      type: FETCH_METADATA_ERROR,
      error,
    })
  }
}

export const MINT_REQUEST = 'MINT_REQUEST'
export const MINT_RESULT = 'MINT_RESULT'
export const MINT_ERROR = 'MINT_ERROR'
export const mint = (city: string) => async (dispatch: any, getState: any) => {
  const state: State = getState()

  try {
    dispatch({
      type: MINT_REQUEST,
    })

    console.log('Minting...')

    const metadata: any = {
      "name": `My Air NFT ${city}`,
      "description": `NFT that changes its illustration based on the real-time pollution level in ${city}`,
      "image": "https://myairnft.com/favicon.png",
      "properties": {
        "city": city,
      }
    }

    const data = {
      tokenId: "0.0.47698143",
      amount: 1,
      isNft: true,
      metadata
    }

    const signingAcct = state.wallet.pairedAccounts[0]

    let trans = await new TokenMintTransaction()
      .setTokenId(data.tokenId)
      .addMetadata(new Uint8Array(Buffer.from(city))); //JSON.stringify(metadata)

    let transBytes: Uint8Array = await makeBytes(trans, signingAcct);

    let res = await sendTransaction(transBytes, signingAcct, state.wallet.topic, state.wallet.hashconnect!);

    //handle response
    let responseData: any = {
      response: res,
      receipt: null
    }

    if (res.success) responseData.receipt = TransactionReceipt.fromBytes(res.receipt as Uint8Array);

    console.log(responseData);

    dispatch(showToaster(SUCCESS, 'NFT sent to your wallet', 'Enjoy!'))

    dispatch({
      type: MINT_RESULT,
      mintConfirmation: undefined,
    })
  } catch (error: any) {
    console.error(error)
    dispatch(showToaster(ERROR, 'Error', error.message))
    dispatch({
      type: MINT_ERROR,
      error,
    })
  }
}


export const CREATE_REQUEST = 'CREATE_REQUEST'
export const CREATE_RESULT = 'CREATE_RESULT'
export const CREATE_ERROR = 'CREATE_ERROR'
export const create = () => async (dispatch: any, getState: any) => {
  const state: State = getState()

  try {
    dispatch({
      type: CREATE_REQUEST,
    })

    console.log('Creating...')

    const signingAcct = state.wallet.pairedAccounts[0]

    const tokenData = {
      name: "AIR NFT",
      symbol: "AIR",
      decimals: 0,
      initialSupply: 0,

      adminKey: signingAcct,
      autoRenewAccountID: signingAcct,
      expiry: 1000000000000,
      expirationTime: 1000000000000,
      type: TokenType.NonFungibleUnique,
      supplyType: TokenSupplyType.Infinite,
      maxSupply: 10000,
      includeRoyalty: false,
      includeFixedFee: false,
      includeFractionalFee: false,
      royaltyPercent: 0,
      fixedFee: 0,
      fixedTokenId: "",
      fractionalFee: {
        percent: 0,
        max: 0,
        min: 0
      },
      fallbackFee: 0,
    }

    let accountInfo: any = await window.fetch("https://testnet.mirrornode.hedera.com/api/v1/accounts/" + signingAcct, { method: "GET" });
    accountInfo = await accountInfo.json();
    let customFees: CustomFee[] = [];

    let key = await PublicKey.fromString(accountInfo.key.key)

    let trans = await new TokenCreateTransaction()
      .setTokenName(tokenData.name)
      .setTokenSymbol(tokenData.symbol)
      .setTokenType(tokenData.type)
      .setDecimals(0)
      .setSupplyType(tokenData.supplyType)
      .setInitialSupply(tokenData.initialSupply)
      .setTreasuryAccountId(signingAcct)
      .setAutoRenewAccountId(signingAcct)
      .setExpirationTime(new Date(2050, 10, 30))
      .setAutoRenewPeriod(1000)
      .setAdminKey(key)
      .setSupplyKey(key)
      .setWipeKey(key)
      .setAutoRenewAccountId(signingAcct)

    let transBytes: Uint8Array = await makeBytes(trans, signingAcct);

    let res = await sendTransaction(transBytes, signingAcct, state.wallet.topic, state.wallet.hashconnect!);

    let responseData: any = {
      response: res,
      receipt: null
    }

    if (res.success) responseData.receipt = TransactionReceipt.fromBytes(res.receipt as Uint8Array);

    console.log(responseData);

    dispatch(showToaster(SUCCESS, 'Token Created', 'Enjoy!'))

    dispatch({
      type: CREATE_RESULT,
    })
  } catch (error: any) {
    console.error(error)
    dispatch(showToaster(ERROR, 'Error', error.message))
    dispatch({
      type: CREATE_ERROR,
      error,
    })
  }
}

const makeBytes = async (trans: Transaction, signingAcctId: string) => {
  let transId = TransactionId.generate(signingAcctId)
  trans.setTransactionId(transId);
  trans.setNodeAccountIds([new AccountId(3)]);

  await trans.freeze();

  let transBytes = trans.toBytes();

  return transBytes;
}

const sendTransaction = async (trans: Uint8Array, acctToSign: string, topic: string, hashconnect: HashConnect, return_trans: boolean = false) => {
  const transaction: MessageTypes.Transaction = {
    topic: topic,
    byteArray: trans,

    metadata: {
      accountToSign: acctToSign,
      returnTransaction: return_trans,
    }
  }

  return await hashconnect.sendTransaction(topic, transaction)
}
