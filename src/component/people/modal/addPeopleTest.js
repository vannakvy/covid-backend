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

    // console.log(peopleID)

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
                labFormCompletedBy: values.labFormCompletedBy,
                laboratory:values.laboratory,
                reasonForTesting:values.reasonForTesting,
                symptomStart:moment(values.symptomStart).format(),
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
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <DatePicker placeholder="កាលបវិច្ឆេទការធ្វើតេស្ត" style={{width:"100%"}}/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="location"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="ទីតាំង" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="reasonForTesting"
                            // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            {/* <Input placeholder="លទ្ធផល" /> */}
                            <Select placeholder="បំណងធ្វើតេស្ត" style={{ width: "100%" }}>
                                <Option value="សង្ស័យ">សង្ស័យ</Option>
                                <Option value="រលាកសួត">រលាកសួត</Option>
                                <Option value="បុគ្គលិកពេទ្យ">បុគ្គលិកពេទ្យ</Option>
                                <Option value="ពលករ">ពលករ</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset:2 }}>
                        <Form.Item
                            name="symptomStart"
                            // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទរោគសញ្ញា" style={{width:"100%"}}/>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="specimentType"
                            // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            {/* <Input placeholder="លទ្ធផល" /> */}
                            <Select placeholder="វត្ថុវិភាគ" style={{ width: "100%" }}>
                                <Option value="ច្រមុះ">សង្ស័យ</Option>
                                <Option value="បំពង់ក">រលាកសួត</Option>
                                <Option value="ផ្សេងទៀត">ផ្សេងទៀត</Option>
                                
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset:2 }}>
                        <Form.Item
                            name="laboratory"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                             <Select placeholder="មន្ទីពិសោធន៍" style={{ width: "100%" }}>
                                <Option value="IPC">IPC</Option>
                                <Option value="NIPH">NIPH</Option>
                                <Option value="PKML">PKML</Option>
                                <Option value="MKB">MKB</Option>
                                <Option value="BTB">BTB</Option>
                                <Option value="TKV">TKV</Option>
                                <Option value="SRH">SRH</Option>
                                <Option value="NBTC">NBTC</Option>
                                <Option value="SHV">SHV</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="result"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
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
                            // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input type="number" placeholder="លើក" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 24}}>
                        <Form.Item
                            name="symptom"
                            // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
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

                    <Col xs={24} md={{ span: 11}}>
                        <Form.Item
                            name="labFormCompletedBy"
                            // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="បំពេញទំរង់ដោយ" />
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
