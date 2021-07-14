import React, { useContext, useState } from 'react'
import { Modal, Form, Input, Row, Col, Button, Select, DatePicker } from 'antd'
import { provinceData, districtData, communeData, villageData, genderData } from '../../../context/headerContext'
import { ListSelect } from '../../../static/own-comp'
import { convertToCommune, convertToDistrict, convertToVillage } from '../../../function/fn'
import { PeopleController } from '../../../context/peopleContext'

const { RangePicker } = DatePicker;

export default function AddPeopleQuarantine({ open, setOpen }) {
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

    const DateHolder = ["ចាប់ផ្តើមចត្តាឡីស័ក", "បញ្ចាប់ចត្តាឡីស័ក"]

    return (
        <Modal
            title="បញ្ចូលការធ្វើចត្តាឡីស័ក"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                name="addPeopleQuarantine"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 24 }}>
                        <Form.Item
                            name="dateInOut"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <RangePicker placeholder={DateHolder} style={{width: "100%"}} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 24 }}>
                        <Form.Item
                            name="place"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ទីតាំង" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 24}}>
                        <Form.Item
                            name="address"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="អាស័យដ្ឋាន" />
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
