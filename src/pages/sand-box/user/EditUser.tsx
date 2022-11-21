/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-11-20 14:23:10
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-11-21 22:28:33
 * @FilePath: /react-admin-template/src/pages/sand-box/user/EditUser.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react'
import { Form, Input, Modal, Button, message } from 'antd'

import api from '../../../utils/api'

function EditUser(props: any) {
  const { record, refreshData } = props
  const [open, setOpen] = useState(false)
  const { username } = record
  const [form] = Form.useForm()

  const hideModal = () => {
    form
      .validateFields()
      .then(() => {
        const { username } = form.getFieldsValue()
        api.updateByIdUsers({ username, id: record._id }).then((res: any) => {
          if (res.code == 200) {
            setOpen(false)
            message.success(res.msg)
            refreshData()
          }
        })
      })
      .catch(() => {})
  }
  const handleEdit = () => {
    form.resetFields()
    form.setFieldValue('username', username)
    setOpen(true)
  }
  return (
    <div>
      <a onClick={() => handleEdit()}>编辑</a>
      <Modal
        title="修改用户"
        open={open}
        onOk={hideModal}
        onCancel={() => setOpen(false)}
        okText="确认"
        cancelText="取消"
      >
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default EditUser
