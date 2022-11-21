import React, { useState, useEffect } from 'react'
import { Input, Table, Space, Popconfirm, message } from 'antd'
import './index.css'
import EditUser from './EditUser'
import AddUser from './AddUser'
import type { ColumnsType } from 'antd/es/table'
import { AudioOutlined } from '@ant-design/icons'
import api from '../../../utils/api'
const { Search } = Input

interface DataType {
  username: string
  password: string
  _id: string
  createdAt: string
}

let reqData = {
  pageNum: 1,
  pageSize: 10,
  id: '',
  total: 0,
}
function Users() {
  const [tableData, setTableData] = useState([])
  const columns: ColumnsType<DataType> = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '用户ID',
      dataIndex: '_id',
      key: 'id',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle">
            <EditUser record={record} refreshData={() => searchFun()} />
            <Popconfirm
              title="确认删除？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => handleDelete(record)}
            >
              <a href="#">删除</a>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]
  const handleDelete = (record: any) => {
    api.deleteByIdUsers({ id: record._id }).then((res: any) => {
      if (res.code == 200) {
        message.success(res.msg)
        searchFun()
      }
    })
  }
  const onSearch = (value: string) => {
    reqData.id = value
    searchFun()
  }
  useEffect(() => {
    if (tableData.length == 0) {
      searchFun()
    }
  })
  const searchFun = (e?: any) => {
    reqData.pageNum = 1
    if (e) {
      reqData.pageNum = e.current
    }
    api.getUsers(reqData).then((res: any) => {
      if (res.code == 200) {
        setTableData(res.data.users)
        reqData.total = res.data.total
        reqData.pageNum = res.data.pageNum
      }
      console.log(tableData)
    })
  }
  return (
    <div>
      <Search
        placeholder="输入用户Id"
        enterButton="Search"
        onSearch={onSearch}
        allowClear
        style={{ width: 300, marginBottom: 15 }}
      />
      <div className="add-btn">
        <AddUser refreshData={() => searchFun()} />
      </div>
      <Table
        dataSource={tableData}
        columns={columns}
        rowKey="_id"
        pagination={{
          defaultCurrent: 1,
          total: reqData.total,
          current: reqData.pageNum,
        }}
        onChange={(e) => searchFun(e)}
        style={{ height: 500 }}
      />
      ;
    </div>
  )
}

export default Users
