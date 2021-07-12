import React, { useContext } from 'react'
import { Modal, Form, Input, Row, Col, Button, Select, message } from 'antd';
import { UserController } from '../../../context/userContext'
import { setEditUser } from '../../../function/set';


const { Option } = Select;

export default function EditUser({ open, setOpen, data }) {
    const { userDataDispatch } = useContext(UserController)

    let [form] = Form.useForm()

    const onFinish = (values) => {

        userDataDispatch({ type: 'EDIT_USER', payload: { id: data.id, ...values } })
        message.success("កែប្រែបានជោគជ័យ")
        setOpen(false)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="កែប្រេអ្នកប្រើប្រាស់"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                name="addUser"
                initialValues={setEditUser(data)}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >
                            <Input placeholder="ឈ្មោះសម្គាល់អ្នកប្រើប្រាស់" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >
                            <Input placeholder="លេខកូដសម្ងាត់" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="role"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >

                            <Select placeholder="តួនាទី" style={{ width: "100%" }}>
                                <Option value="ADMIN">ADMIN</Option>
                                <Option value="USER">USER</Option>

                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="tel"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="លេខទូរស័ព្ទ" />
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
                        <Form.Item
                            name="note"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ចំណាំ" />
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{ width: "100%" }}
                        >
                            កែប្រែទិន្នន័យ
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
