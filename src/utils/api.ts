/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-08-21 16:38:52
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-08-21 16:59:04
 * @FilePath: /react-admin-demo/src/utils/api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from './http'
let loginUrl = '/api/login'
let userObj = {
  userUrl: '/api/users',
  updateUser: '/api/users/update',
  updateByIdUser: '/api/users/updateById'
}

const api = {
  login:(data:object)=>{
    return http.post(loginUrl, data)
  },
  getUsers:(data:any) => {
    return http.get(userObj.userUrl, data)
  },
  postUsers:(data?:any) => {
    return http.post(userObj.updateUser, data)
  },
  updateByIdUsers:(data?:any) => {
    return http.post(userObj.updateByIdUser, data)
  }
}

export default api
