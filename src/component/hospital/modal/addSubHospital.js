import React, { useContext, useState } from 'react'
import { Form, Modal, Input, Row, Col, Button, Select, message,DatePicker } from 'antd'
import { HospitalController } from '../../../context/hospitalContext'
import { ListSelect } from '../../../static/own-comp'
import { provinceData, districtData, communeData, villageData, genderData } from '../../../context/headerContext'
import { convertToDistrict, convertToCommune, convertToVillage } from '../../../function/fn'
import { useMutation } from '@apollo/client'
import { CREATE_NEW_HOSPITALIZATION } from '../../../graphql/hospital'
import moment from 'moment'

const { Option } = Select

export default function AddSubHospital({ open, setOpen, hospitalId,peopleData }) {

    let [form] = Form.useForm()

    const [createHospitalization,{loading}]=useMutation(CREATE_NEW_HOSPITALIZATION,{
        onCompleted:()=>{
            message.success("បញ្ចូលទិន្នន័យជោគជ័យ")
        }
    })

    const onFinish = (values) => {
        console.log('Success:', values);

        //subHospitalDataDispatch({ type: 'ADD_SUB_HOSPITAL', payload: {...values, hospitalId: hospitalId} })
        createHospitalization({variables:{
            in: values.in,
            date_in:moment(values.date_in).format(),
            date_out:moment(values.date_out).format(),
            personalInfo:values.personalInfo,
            hospitalInfo:hospitalId,
            others:values.others,
            // date:moment(values.date).format(),
            // times:values.times,
            // location:values.location,
            // result:values.result,
            // symptom:values.symptom,
            // other:values.other
        }})

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
            title="បញ្ចូលធ្វើតេស្ត"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                name="addSubHospital"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="personalInfo"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <ListSelect type={2} data={peopleData} title="អ្នកធ្វើតេស្ត" setValue={setToPeopleFn}/>
                            {/* <Select placeholder="អ្នកធ្វើតេស្ត" style={{ width: "100%" }} onChange={(e)=>console.log(e)}>
                                {peopleData.map((people)=>(
                                     <Option key={people?.id} value={people?.id}>{people?.lastName} {people?.firstName}</Option>
                                ))}
                               
                            </Select> */}
                        </Form.Item>
                    </Col>

                    {/* <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="personalType"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >

                            <Select placeholder="ប្រភេទ" style={{ width: "100%" }}>
                                <Option value="សហគមន៍">សហគមន៍</Option>
                                <Option value="តាមផ្លូងអាកាស">តាមផ្លូងអាកាស</Option>
                                <Option value="ពលករ">ពលករ</Option>
                            </Select>
                        </Form.Item>
                    </Col> */}

                    <Col xs={24} md={{ span: 11,offset:2}}>
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

                    <Col xs={24} md={{ span: 11, offset:2 }}>
                        <Form.Item
                            name="date_out"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទចូល" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 24}}>
                        <Form.Item
                            name="others"
                            //rules={[{ required: true, message: 'Please input your username!' }]}
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
