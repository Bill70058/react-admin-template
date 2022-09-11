/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-09-11 17:04:15
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-09-11 17:05:31
 * @FilePath: /react-admin-template/src/redux/store.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A
 */
import counterReducer from './counterSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    userInfo: counterReducer
  }
})