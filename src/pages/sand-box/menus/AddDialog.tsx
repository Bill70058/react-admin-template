/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-11-22 20:37:14
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-11-22 21:40:52
 * @FilePath: /react-admin-template/src/pages/sand-box/menus/AddDialog.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Select, message } from 'antd'
import api from 'utils/api'

function AddDialog(props: any) {
  const { getTableData } = props
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    form.resetFields()
    setIsModalOpen(true)
  }

  const handleOk = () => {
    form
      .validateFields()
      .then((valida) => {
        let obj = form.getFieldsValue(true)
        api.addPages(obj).then((res: any) => {
          if (res.code === 200) {
            message.success(res.msg)
            setIsModalOpen(false)
            getTableData()
          } else {
            message.error(res.msg)
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const [form] = Form.useForm()
  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        style={{ marginBottom: '10px', float: 'right' }}
      >
        新增
      </Button>
      <Modal
        title="新增菜单"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          labelCol={{ span: 5 }}
          initialValues={{ isLeaf: false }}
        >
          <Form.Item label="等级" name="grade" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="是否私密页面"
            name="pagepermisson"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="页面标题" name="label" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="页面路径" name="key" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="是否有子节点"
            name="isLeaf"
            rules={[{ required: true }]}
          >
            <Select
              style={{ width: 120 }}
              options={[
                {
                  value: true,
                  label: '是',
                },
                {
                  value: false,
                  label: '否',
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="父节点ID" name="parentId">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddDialog
