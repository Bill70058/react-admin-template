/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-11-20 14:03:14
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-11-22 22:02:24
 * @FilePath: /react-admin-template/src/utils/api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from './https'
let loginUrl = '/api/login'
let userObj = {
  userUrl: '/api/users',
  updateUser: '/api/users/update',
  updateByIdUser: '/api/users/updateById',
  deleteById: '/api/users/deleteById',
  pageList: '/api/pages'
}

const api = {
  login: (data: object) => {
    return http.post(loginUrl, data)
  },
  getUsers: (data: any) => {
    return http.get(userObj.userUrl, data)
  },
  postUsers: (data?: any) => {
    return http.post(userObj.userUrl, data)
  },
  updateByIdUsers: (data?: any) => {
    return http.put(userObj.updateByIdUser, data)
  },
  deleteByIdUsers: (data?: any) => {
    return http.delete(userObj.deleteById, data)
  },
  getPages: () => {
    return http.get(userObj.pageList)
  },
  addPages: (data:any) => {
    return http.post(userObj.pageList, data)
  },
  delPages: (data:any) => {
    return http.delete(userObj.pageList, data)
  }
}

export default api
