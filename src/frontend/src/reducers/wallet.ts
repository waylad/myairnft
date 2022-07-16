import { CONNECT, SET_WALLET } from "pages/Home/Home.actions"

export interface WalletState {
  topic: string,
  pairingString: string,
  privateKey: string,
  pairedWalletData: any,
  pairedAccounts: any[]
}

const walletDefaultState: WalletState = {
  topic: "",
  pairingString: "",
  privateKey: "",
  pairedWalletData: undefined,
  pairedAccounts: []
}

export function wallet(state = walletDefaultState, action: any): WalletState {
  switch (action.type) {
    case SET_WALLET:
      return {
        ...state,
        topic: action.topic,
        pairingString: action.pairingString,
        privateKey: action.privateKey,
        pairedWalletData: action.pairedWalletData,
        pairedAccounts: action.pairedAccounts,
      }
    case CONNECT:
      return {
        ...state,
        topic: action.topic,
        pairingString: action.pairingString,
        privateKey: action.privateKey,
        pairedWalletData: action.pairedWalletData,
        pairedAccounts: action.pairedAccounts,
      }
    default:
      return state
  }
}
