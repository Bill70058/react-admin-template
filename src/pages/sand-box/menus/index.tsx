/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-11-21 22:35:43
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-11-21 22:57:39
 * @FilePath: /react-admin-template/src/pages/sand-box/menus/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import api from '../../../utils/api'

interface menusType {
  id: number
  grade: number
  label: string
  key: string
  pagepermisson: number
  children?: menusType[]
}

function Menus() {
  useEffect(() => {
    api.getPages().then((res: any) => {
      if (res.code === 200) {
        setMenus(res.data)
      }
    })
  }, ['count'])
  const [count, setCount] = useState(0)
  const [menus, setMenus] = useState<menusType | any>([])
  const columns: any[] = [
    {
      title: '等级',
      dataIndex: 'grade',
    },
    {
      title: '是否私密页面',
      dataIndex: 'pagepermisson',
    },
    {
      title: '页面标题',
      dataIndex: 'label',
    },
    {
      title: '页面路径',
      dataIndex: 'key',
    },
  ]
  return (
    <div>
      <Table dataSource={menus} columns={columns} bordered rowKey="id"></Table>
    </div>
  )
}

export default Menus
