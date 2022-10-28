import http from './https'
let loginUrl = '/api/login'
let userObj = {
  userUrl: '/api/users',
  updateUser: '/api/users/update',
  updateByIdUser: '/api/users/updateById',
  deleteById: '/api/users/deleteById'
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
  }
}

export default api
