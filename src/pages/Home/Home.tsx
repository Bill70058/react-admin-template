import React, { useEffect } from 'react'
import { store } from 'redux/store'
import { setInfo } from 'redux/counterSlice'
function Home() {
  useEffect(() => {
    // console.log(JSON.parse(sessionStorage.getItem('userInfo') || ''))
    if (!sessionStorage.getItem('userInfo')) {
      store.dispatch(
        setInfo(JSON.parse(sessionStorage.getItem('userInfo') || ''))
      )
    }
  })
  return <div>Home</div>
}

export default Home
