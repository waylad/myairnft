import { HashConnect } from "hashconnect"
import { CONNECT, SET_ACCOUNT_ID } from "pages/Home/Home.actions"

export interface WalletState {
  hashconnect?: HashConnect,
  topic: string,
  pairingString: string,
  privateKey: string,
  pairedWalletData: any,
  pairedAccounts: string[]
}

const walletDefaultState: WalletState = {
  hashconnect: undefined,
  topic: "",
  pairingString: "",
  privateKey: "",
  pairedWalletData: undefined,
  pairedAccounts: []
}

export function wallet(state = walletDefaultState, action: any): WalletState {
  switch (action.type) {
    case SET_ACCOUNT_ID:
      return {
        ...state,
        pairedAccounts: [...state.pairedAccounts, action.accountId],
      }
    case CONNECT:
      return {
        ...state,
        hashconnect: action.hashconnect,
        topic: action.topic,
        pairingString: action.pairingString,
        privateKey: action.privateKey,
      }
    default:
      return state
  }
}
