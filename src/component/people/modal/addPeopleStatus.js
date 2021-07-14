import React, { useContext, useState } from 'react'
import { Modal, Form, Input, Row, Col, Button, Select, DatePicker } from 'antd'
import { provinceData, districtData, communeData, villageData, genderData } from '../../../context/headerContext'
import { ListSelect } from '../../../static/own-comp'
import { convertToCommune, convertToDistrict, convertToVillage } from '../../../function/fn'
import { PeopleController } from '../../../context/peopleContext'

export default function AddPeopleStatus({ open, setOpen }) {
    const { peopleDataDispatch } = useContext(PeopleController)

    let [form] = Form.useForm()

    const onFinish = (values) => {
        console.log('Success:', values);

        peopleDataDispatch({ type: 'ADD_PEOPLE', payload: values })

        setOpen(false)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="បញ្ចូលស្ថានភាពបច្ចុប្បន្ន"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                name="addPeopleStatus"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="date"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <DatePicker placeholder="កាលបវិច្ឆេទ" style={{width:"100%"}}/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="status"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ស្ថានភាព" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 24 }}>
                        <Form.Item
                            name="remark"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ផ្សេងៗ" />
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
