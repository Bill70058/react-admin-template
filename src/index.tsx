/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-10-15 19:38:01
 * @LastEditors: bill Lin_k_Bill@163.com
 * @LastEditTime: 2022-12-10 23:34:58
 * @FilePath: /react-admin-template/src/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'antd/dist/antd.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Loading from './components/loading'
import { BrowserRouter } from 'react-router-dom'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </Suspense>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
