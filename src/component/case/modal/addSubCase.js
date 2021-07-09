import React, { useContext } from 'react'
import { Form, Modal, Input, Row, Col, Button, Select } from 'antd'
import { CaseController } from '../../../context/caseContext'

const {Option} = Select

export default function AddSubCase({ open, setOpen }) {
    const { caseDataDispatch } = useContext(CaseController)

    let [form] = Form.useForm()

    const onFinish = (values) => {
        console.log('Success:', values);

        caseDataDispatch({ type: 'ADD_CASE', payload: values })

        setOpen(false)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="បញ្ចូលករណីថ្មី"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                name="addCase"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="caseTitle"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ឈ្មោះករណី" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="date"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="ភេទ"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="address"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="អាស័យដ្ឋាន" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="status"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="ស្ថានភាព"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
                        <Form.Item
                            name="relatedInfo"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="លក្ខណៈពាក់ព័ន្ធ" />
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
