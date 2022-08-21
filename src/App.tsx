/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-08-17 20:31:02
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-08-21 18:10:32
 * @FilePath: /react-admin-demo/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-08-17 20:31:02
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-08-17 21:02:46
 * @FilePath: /react-admin-demo/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Index from './pages/Index'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import { router } from './route/index'
import './App.css'

function App() {
  const routerMap = () => {
    return (
      <>
        {router.map((route) => {
          if (route.meta.needLogin) {
            return (
              <Route path={route.path} element={<Index />} key={route.key} />
            )
          } else {
            return (
              <Route
                path={route.path}
                element={route.component}
                key={route.key}
              >
                {
                  <>
                    {route.children?.map((childRoute) => {
                      return (
                        <Route
                          path={childRoute.path}
                          element={childRoute.component}
                          key={childRoute.key}
                        />
                      )
                    })}
                  </>
                }
              </Route>
            )
          }
        })}
      </>
    )
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>{routerMap()}</Routes>
        {/* <Routes>
          <Route path="/" element={<Index />}></Route>
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
        </Routes> */}
      </BrowserRouter>
    </div>
  )
}

export default App
