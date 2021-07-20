import React, { useContext, useState } from 'react'
import { Modal, Form, Input, Row, Col, Button, Select, DatePicker,message } from 'antd'
import { provinceData, districtData, communeData, villageData, genderData } from '../../../context/headerContext'
import { ListSelect } from '../../../static/own-comp'
import { convertToCommune, convertToDistrict, convertToVillage } from '../../../function/fn'
import { PeopleController } from '../../../context/peopleContext'
import { useMutation,useQuery } from '@apollo/client';
import { RECORD_SAMPLETEST } from '../../../graphql/people';
import moment from 'moment'

const {Option} = Select

export default function AddPeopleTest({ open, setOpen, peopleID }) {
    //const { peopleDataDispatch } = useContext(PeopleController)

    let [form] = Form.useForm()

    const [recordSampleTest,{loading}] = useMutation(RECORD_SAMPLETEST,{
        onCompleted:()=>{
            message.success("បញ្ចូលទិន្នន័យជោគជ័យ")
        }
    })

    console.log(peopleID)

    const onFinish = (values) => {
        console.log('Success:', values);

        //peopleDataDispatch({ type: 'ADD_PEOPLE', payload: values })

        recordSampleTest({
            variables:{
                date:moment(values.date).format(),
                times: parseInt(values.times),
                location:values.location,
                result:values.result,
                symptom:values.symptom,
                other:values.other,
                personalInfoId:peopleID,
            }
        })

        // setOpen(false)
        // form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="បញ្ចូលការធ្វើតេស្ត"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                name="addPeopleTest"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="date"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <DatePicker placeholder="កាលបវិច្ឆេទការធ្វើតេស្ត" style={{width:"100%"}}/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="location"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ទីតាំង" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="result"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            {/* <Input placeholder="លទ្ធផល" /> */}
                            <Select placeholder="លទ្ធផល" style={{ width: "100%" }}>
                                <Option value={true}>វិជ្ជមាន</Option>
                                <Option value={false}>អវិជ្ជមាន</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="times"
                            // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input type="number" placeholder="លើក" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 24}}>
                        <Form.Item
                            name="symptom"
                            // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="អាការ" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 24 }}>
                        <Form.Item
                            name="other"
                        
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
