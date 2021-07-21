import React, { useContext, useState, useEffect } from 'react'
import { Form, Modal, Input, Row, Col, Button, Select, DatePicker, message } from 'antd'
import { ListSelect } from '../../../static/own-comp'
import { setEditSubHospital } from '../../../function/set'
import { useMutation } from '@apollo/client'
import { UPDATE_PERSON_BY_HOSPITALINFO } from '../../../graphql/hospital'
import moment from 'moment'

const { Option } = Select

export default function EditSubHospital({ open, setOpen, data, hospitalId, peopleData }) {

    let [form] = Form.useForm()

    const [updateHospitalization,{loading}]=useMutation(UPDATE_PERSON_BY_HOSPITALINFO,{
        onCompleted:()=>{
            message.success("កែប្រែទិន្នន័យជោគជ័យ")
        }
    })

    useEffect(() => {
        form.resetFields()
    }, [data,open])

    const onFinish = (values) => {
        // console.log('Success:', values,data.id);
        updateHospitalization({
            variables:{
                in:values.in,
                date_in:moment(values.date_in).format(),
                date_out:moment(values.date_out).format(),
                // out_status:String,
                personalInfo:values.personalInfo,
                hospitalInfo:hospitalId,
                others:values.others,
                id:data.id
            }
        })

        setOpen(false)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const setToPeopleFn = (e) => {
        form.setFieldsValue({
            personalInfo: e
        });
    };


    return (
        <Modal
            title="កែប្រែអ្នកជំងឺ"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                name="editSubHospital"
                initialValues={setEditSubHospital(data)}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="personalInfo"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <ListSelect type={2} data={peopleData} title="អ្នកធ្វើតេស្ត" setValue={setToPeopleFn} />
                            {/* <Select placeholder="អ្នកចត្តាឡីស័ក" style={{ width: "100%" }} onChange={(e) => console.log(e)}>
                                {peopleData.map((people) => (
                                    <Option key={people?.id} value={people?.id}>{people?.lastName} {people?.firstName}</Option>
                                ))}

                            </Select> */}
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="in"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >

                            <Select placeholder="តេស្ត" style={{ width: "100%" }}>
                                <Option value={true}>ចូល</Option>
                                <Option value={false}>ចេញ</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="date_in"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទចូល" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="date_out"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទចូល" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 24 }}>
                        <Form.Item
                            name="others"
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
                            កែប្រែទិន្នន័យ
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
