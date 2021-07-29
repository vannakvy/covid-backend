import React, { useContext, useState, useEffect } from 'react'
import { Form, Modal, Input, Row, Col, Button, Select, DatePicker, message } from 'antd'
import { setEditSubQuarantine } from '../../../function/set'
import { useMutation } from '@apollo/client'
import { UPDATE_PEOPLE_BY_QUARANTINE } from '../../../graphql/quarantine'
import moment from 'moment'
const { Option } = Select

export default function EditSubQuarantine({ open, setOpen, data, quarantineId, peopleData, setRefetch }) {

    let [form] = Form.useForm()

    const [updateQuarantine,{loading}]=useMutation(UPDATE_PEOPLE_BY_QUARANTINE,{
        onCompleted:()=>{
            setRefetch()
            message.success("កែប្រែទិន្នន័យជោគជ័យ")
        }
    })

    useEffect(() => {
        form.resetFields()
        // setEditData(data)
    }, [data, open])

    const onFinish = (values) => {

        updateQuarantine({
            variables:{
                in:values.in,
                date_in:moment(values.date_in).format(),
                date_out:moment(values.date_out).format(),
                personalType:values.personalType,
                // out_status: String,
                personalInfo:values.personalInfo,
                quarantineInfo:quarantineId,
                others: values.others,
                id:data.id
            }
        })

        setOpen(false)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="កែប្រែអ្នកចត្តាឡីស័ក"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}

        >
            <Form
                form={form}
                name="editSubQuarantine"
                initialValues={setEditSubQuarantine(data)}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="personalInfo"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            {/* <Input placeholder="ឈ្មោះ" /> */}
                            <Select placeholder="អ្នកចត្តាឡីស័ក" style={{ width: "100%" }} onChange={(e) => console.log(e)}>
                                {peopleData.map((people) => (
                                    <Option key={people?.id} value={people?.id}>{people?.lastName} {people?.firstName}</Option>
                                ))}

                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="personalType"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >

                            <Select placeholder="ប្រភេទ" style={{ width: "100%" }}>
                                <Option value="សហគមន៍">សហគមន៍</Option>
                                <Option value="តាមផ្លូងអាកាស">តាមផ្លូងអាកាស</Option>
                                <Option value="ពលករ">ពលករ</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="date_in"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទចូល" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="date_out"
                            // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទចូល" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 24 }}>
                        <Form.Item
                            name="others"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
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
