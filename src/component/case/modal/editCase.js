import React, {useContext} from 'react'
import { Modal, Form, Input, DatePicker, Row, Col, Button } from 'antd'
import {CaseController} from '../../../context/caseContext'
import {setEditCase} from '../../../function/set'

export default function EditCase({ open, setOpen, data, setData }) {
    const {caseDataDispatch} = useContext(CaseController)

    let [form] = Form.useForm()

    const onFinish = (values) => {
        console.log('Success:', values);

        caseDataDispatch({type: 'EDIT_CASE', payload: {...values, id: data.id}})
        setData({...values, id: data.id})

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
                name="editCase"
                initialValues={setEditCase(data)}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{span:11}}>
                        <Form.Item
                            name="caseTitle"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ឈ្មោះករណី" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{span:11, offset: 2}}>
                        <Form.Item
                            name="date"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទ" style={{width: "100%"}} />
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
                        <Form.Item
                            name="place"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ទីកន្លែង" />
                        </Form.Item>
                    </Col>

                    {/* <Col xs={24} md={{span:11}}>
                        <Form.Item
                            name="related"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input type="number" placeholder="ចំនួនអ្នកពាក់ព័ន្ធផ្ទាល់" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{span:11, offset: 2}}>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input type="number" placeholder="ចំនួនអ្នកពាក់ព័ន្ធប្រយោល" />
                        </Form.Item>
                    </Col> */}

                    <Col xs={24}>
                        <Form.Item
                            name="remark"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ចំណាំ" />
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
                        <Button 
                            htmlType="submit"
                            type="primary"
                            style={{width: "100%"}}
                        >
                            បញ្ចូលទិន្នន័យ
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
