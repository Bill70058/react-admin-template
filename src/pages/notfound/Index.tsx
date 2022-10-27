/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-10-15 19:58:23
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-10-15 19:58:28
 * @FilePath: /react-admin-template/src/pages/notfound/Index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Result } from 'antd'

function Index() {
  return  <div>
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
  />
</div>
}

export default Index
