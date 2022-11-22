/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-11-21 22:35:43
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-11-22 22:09:15
 * @FilePath: /react-admin-template/src/pages/sand-box/menus/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react'
import { Table, Tag, Space, Popconfirm, message } from 'antd'
import api from '../../../utils/api'
import AddDialog from './AddDialog'

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
    getTableData()
  }, ['count'])
  const [count, setCount] = useState(0)
  const [menus, setMenus] = useState<menusType | any>([])
  const columns: any[] = [
    {
      title: '等级',
      dataIndex: 'grade',
      render: (_: any, record: any) => (
        <Tag color="geekblue" key={record.id}>
          {record.grade}
        </Tag>
      ),
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
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a>编辑</a>
          <Popconfirm
            title="确认删除该菜单?"
            onConfirm={() => confirmDel(record)}
            okText="是"
            cancelText="否"
          >
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  const getTableData = () => {
    api.getPages().then((res: any) => {
      if (res.code === 200) {
        setMenus(res.data)
      }
    })
  }

  const confirmDel = (data: any) => {
    const { id } = data
    api.delPages({ id }).then((res: any) => {
      if (res.code === 200) {
        message.success(res.msg)
        setMenus(res.data)
        getTableData()
      } else {
        message.error(res.msg)
      }
    })
  }
  return (
    <div>
      <AddDialog getTableData={() => getTableData()} />
      <Table dataSource={menus} columns={columns} bordered rowKey="id"></Table>
    </div>
  )
}

export default Menus
