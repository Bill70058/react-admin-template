/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-08-21 16:38:52
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-08-21 16:59:04
 * @FilePath: /react-admin-demo/src/utils/api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from './http'
let todoList = '/api/todo'

const api = {
  getTodoList: (data?:object)=>{
    return http.get(todoList, data)
  },
  addTodoList:(data:object)=>{
    return http.post(todoList, data)
  }
}

export default api
