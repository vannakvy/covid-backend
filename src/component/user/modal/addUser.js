import React, { useContext } from 'react'
import { Modal, Form, Input, DatePicker, Row, Col, Button,Select} from 'antd';
import { UserController } from '../../../context/userContext'


const { Option } = Select;

export default function AddUser({ open, setOpen }) {
    const { userDataDispatch } = useContext(UserController)

    let [form] = Form.useForm()

    const onFinish = (values) => {
        console.log('Success:', values);

        userDataDispatch({ type: 'ADD_USER', payload: values })

        setOpen(false)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="បញ្ចូលអ្នកប្រើប្រាស់ថ្មី"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                name="addUser"
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
                            {/* <Input placeholder="តួនាទី" /> */}
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
                            បញ្ចូលទិន្នន័យ
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
