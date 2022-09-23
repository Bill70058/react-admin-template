import React, { useState } from 'react'
import { Button, Modal, Form, Input, message } from 'antd'
import api from '../../utils/api'

function AddUser(props: any) {
  const { refreshData } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  const handleOk = () => {
    form
      .validateFields()
      .then(() => {
        const { username, password } = form.getFieldsValue()
        api.postUsers({ username, password }).then((res: any) => {
          if (res.code == 200) message.success(res.msg)
          setIsModalOpen(false)
          refreshData()
        })
      })
      .catch((err) => {
        console.log(err)
      })
    // setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleOpen = () => {
    form.resetFields()
    setIsModalOpen(true)
  }

  return (
    <div>
      <Button onClick={handleOpen}>新增</Button>
      <Modal
        title="新增用户"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddUser
