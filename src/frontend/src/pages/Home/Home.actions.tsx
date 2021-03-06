import { HashConnect, HashConnectTypes } from 'hashconnect';
import { State } from 'reducers'

import { showToaster } from '../../app/App.components/Toaster/Toaster.actions'
import { ERROR } from '../../app/App.components/Toaster/Toaster.constants'

let appMetadata: HashConnectTypes.AppMetadata = {
  name: "My Air NFT",
  description: "Dynamic NFT that will change automatically based on the pollution level of your city",
  icon: "https://myairnft.com/favicon.png",
}

let hashconnect: HashConnect;

export const SET_ACCOUNT_ID = 'SET_ACCOUNT_ID'
export const CONNECT = 'CONNECT'
export const connect = () =>
  async (dispatch: any, getState: any) => {
    const state: State = getState()

    try {
      hashconnect = new HashConnect();
      hashconnect.pairingEvent.once((pairingData) => {
        pairingData.accountIds.forEach(id => {
            console.log('id', id)
            dispatch({
              type: SET_ACCOUNT_ID,
              accountId: id,
            })
        })
      })
    
      console.log('Connecting...')

      if (!(state.wallet.privateKey && state.wallet.topic && state.wallet.pairedWalletData)) {
        console.log('First time')

        let initData = await hashconnect.init(appMetadata);
        const state = await hashconnect.connect();
        const pairingString = hashconnect.generatePairingString(state, "testnet", true);
        hashconnect.findLocalWallets();
        hashconnect.connectToLocalWallet(pairingString);
      
        dispatch({
          type: CONNECT,
          hashconnect,
          privateKey: initData.privKey,
          topic: state.topic,
          pairingString
        })
      }
      else {
        console.log('Second time')

        await hashconnect.init(appMetadata, state.wallet.privateKey);
        await hashconnect.connect(state.wallet.topic, state.wallet.pairedWalletData);
      }

    } catch (err: any) {
      dispatch(showToaster(ERROR, 'Failed to connect Wallet', err.message))
      console.error(`Failed to connect Wallet: ${err.message}`)
    }
  }