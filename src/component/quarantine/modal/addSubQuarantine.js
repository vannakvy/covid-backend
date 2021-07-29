import React from 'react'
import { Form, Modal, Input, Row, Col, Button, Select,DatePicker, message } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_PERSON_QUARANTINE } from '../../../graphql/quarantine'
import moment from 'moment'

const { Option } = Select

export default function AddSubQuarantine({ open, setOpen, quarantineId, peopleData, setRefetch }) {

    let [form] = Form.useForm()

    const [createQuarantine,{data}]=useMutation(CREATE_PERSON_QUARANTINE,{
        onCompleted:({createQuarantine})=>{
            setRefetch()
            message.success("បញ្ចូលទិន្នន័យជោគជ័យ")
        }
    })

    const onFinish = (values) => {
        createQuarantine({variables:{
            in:values.in,
            date_in:moment(values.date_in).format(),
            date_out:moment(values.date_out).format(),
            personalType:values.personalType,
            personalInfo:values.personalInfo,
            quarantineInfo:quarantineId,
            others:values.others,
        }})

        setOpen(false)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="បញ្ចូលអ្ន​កចត្តាឡីស័ក"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                name="addSubCase"
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
                            <Select placeholder="អ្នកចត្តាឡីស័ក" style={{ width: "100%" }} onChange={(e)=>console.log(e)}>
                                {peopleData.map((people)=>(
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

                    {/* <Col xs={24} md={{ span: 24}}>
                        <Form.Item
                            name="in"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >

                            <Select placeholder="ចត្តាឡីស័ក" style={{ width: "100%" }}>
                                <Option value={true}>ចូល</Option>
                                <Option value={false}>ចេញ</Option>
                            </Select>
                        </Form.Item>
                    </Col> */}

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="date_in"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទចូល" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset:2 }}>
                        <Form.Item
                            name="date_out"
                            // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទចូល" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 24}}>
                        <Form.Item
                            name="others"
                            // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
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
