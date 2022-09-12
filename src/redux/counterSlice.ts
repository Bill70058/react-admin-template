/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-09-11 16:50:24
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-09-12 17:00:00
 * @FilePath: /react-admin-template/src/redux/store.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  createSlice,
  configureStore
} from '@reduxjs/toolkit'


interface UserInfo {
  username?: String,
    route: String[]
}

const userInfo: UserInfo = {
  route: ['login']
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    userInfo,
    value: 1
  },
  reducers: {
    incremented: state => {
      // Redux Toolkit 允许在 reducers 中编写 "mutating" 逻辑。
      // 它实际上并没有改变 state，因为使用的是 Immer 库，检测到“草稿 state”的变化并产生一个全新的
      // 基于这些更改的不可变的 state。
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    },
    setInfo: (state, info) => {
      console.log(info)
      state.userInfo = info.payload
    }
  }
})

export const {
  incremented,
  decremented,
  setInfo
} = counterSlice.actions

export default counterSlice.reducer
