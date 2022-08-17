/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-08-17 20:51:11
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-08-17 20:51:19
 * @FilePath: /react-admin-demo/src/pages/Page404/Page404.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Result } from 'antd'
import React from 'react'

function Page404() {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </div>
  )
}

export default Page404
