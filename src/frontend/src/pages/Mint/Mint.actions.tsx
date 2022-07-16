import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { ERROR, SUCCESS } from 'app/App.components/Toaster/Toaster.constants'
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

        // TODO


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
