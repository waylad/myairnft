import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { State } from 'reducers'

import { connect } from './Home.actions'
import { HomeView } from './Home.view'

export const Home = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.loading)
  const { topic,
    pairingString,
    privateKey,
    pairedWalletData,
    pairedAccounts } = useSelector((state: State) => state.wallet)

  console.log(topic,
    pairingString,
    privateKey,
    pairedWalletData,
    pairedAccounts)

  const handleConnect = () => {
    dispatch(connect())
  }

  return (
    <div onClick={handleConnect}>
      topic {topic}
    </div>
    // <>
    //   {ready ? (
    //     <Navigate to="/my-nft" replace />
    //   ) : (
    //     <HomeView
    //       loading={loading}
    //       accountPkh={accountPkh}
    //       wallet={wallet}
    //       ready={ready}
    //       handleConnect={handleConnect}
    //       handleNewConnect={handleNewConnect}
    //     />
    //   )}
    // </>
  )
}
