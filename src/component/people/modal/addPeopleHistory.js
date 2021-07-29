import React, { useContext, useState } from 'react'
import { Modal, Form, Input, Row, Col, Button, Select } from 'antd'
import { provinceData, districtData, communeData, villageData, genderData } from '../../../context/headerContext'
import { ListSelect } from '../../../static/own-comp'
import { convertToCommune, convertToDistrict, convertToVillage } from '../../../function/fn'
import { PeopleController } from '../../../context/peopleContext'

export default function AddPeopleHistory({ open, setOpen }) {
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

    const DateHolder = ["កាលបរិច្ឆេទចូល", "កាលបរិច្ឆេទចេញ"]

    return (
        <Modal
            title="បញ្ចូលប្រវត្តិដំណើរករណី"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                name="addPeopleHistory"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="caseName"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="ឈ្មោះករណី" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="place"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="ទីតាំង" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 24}}>
                        <Form.Item
                            name="ទំនាក់ទំនង"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="ទំនាក់ទំនង" />
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
