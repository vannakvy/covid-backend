import React, { useContext } from 'react'
import { Modal, Form, Input, DatePicker, Row, Col, Button,Select} from 'antd';
import { QuarantineController } from '../../../context/quarantineContext'


const { Option } = Select;

export default function AddQuarantine({ open, setOpen }) {
    const { quarantineDataDispatch } = useContext(QuarantineController)

    let [form] = Form.useForm()

    const onFinish = (values) => {
        console.log('Success:', values);

        quarantineDataDispatch({ type: 'ADD_USER', payload: values })

        setOpen(false)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    

    return (
        <Modal
            title="បញ្ចូលមណ្ឌលចត្តាឡីស័កថ្មី"
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
                            name="quarantineName"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >
                            <Input placeholder="ឈ្មោះមណ្ឌល" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="place"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >
                            <Input placeholder="ទីតាំង" style={{ width: "100%" }} />
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
