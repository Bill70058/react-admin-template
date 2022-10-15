/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-10-15 19:38:01
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-10-15 21:22:49
 * @FilePath: /react-admin-template/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './App.css'
import React, { useState, useEffect } from 'react'
import routes from './router/Index'
import { useRoutes } from 'react-router-dom'
import { handelFilterElement, handelEnd } from './utils/routersFilter'
import { deepCopy } from './utils/devUtils'

function App() {
  const [rout, setRout] = useState(routes)
  const element = useRoutes(rout)
  // useEffect(() => {
  //   // deepCopy 深拷贝state数据 不能影响到store里的数据！
  //   // handelFilterElement 映射对应组件
  //   // handelEnd 将路由表嵌入默认路由表得到完整路由表
  //   // const end = handelEnd(handelFilterElement(deepCopy(routs)))
  //   setRouts(handelEnd(routes))
  // }, [routs])
  return <div className="App">{element}</div>
}

export default App
