import { Home } from 'pages/Home/Home.controller'
import { Mint } from 'pages/Mint/Mint.controller'
import { MyNft } from 'pages/MyNft/MyNft.controller'
import { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Toaster } from './App.components/Toaster/Toaster.controller'
import { configureStore } from './App.store'
import { AppView } from './App.style'

export const store = configureStore({})

export const AppContainer = () => {
  const dispatch = useDispatch()

  useEffect(() => {

  }, [dispatch])

  return (
    <BrowserRouter>
    <AppView>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-nft" element={<MyNft />} />
        <Route path="/mint" element={<Mint />} />
      </Routes>
    </AppView>  
    <Toaster />
    </BrowserRouter>
  )
}

export const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}
