import axios from 'axios'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { State } from 'reducers'

import { MyNftView } from './MyNft.view'

export const MyNft = () => {
  const loading = useSelector((state: State) => state.loading)
  // const { accountPkh } = useSelector((state: State) => state.wallet)
  type Tok = {
    city: string
    pollution: string
    level: number
  }
  const [tokens, setTokens] = useState<Tok[]>([])

  useEffect(() => {
    const fetchData = async () => {

        const localStorageTokens = localStorage.tokens
        if(localStorageTokens) {
          let storedTokens = JSON.parse(localStorageTokens)

          storedTokens.forEach(async (city: string) => {
            const pollutionReq = await axios.get(`https://api.waqi.info/feed/${city}/?token=3ab5a02399daca6b7295bbb2579b8d199e480792`)
            console.log(pollutionReq.data)
            const pollution = pollutionReq.data?.data?.aqi
            let level = 1
            if (pollution >= 0 && pollution < 50) level = 1
            if (pollution >= 50 && pollution < 100) level = 2
            if (pollution >= 100) level = 3
            setTokens((tokens) => [...tokens, { city, pollution, level }])
          })
        }
    }
    fetchData()
  }, [])

  return <MyNftView tokens={tokens} loading={loading} accountPkh={'test'} />
}
