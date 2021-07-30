import React, { useContext, useState } from 'react'
import { Form, Modal, Input, Row, Col, Button, Select, message, DatePicker } from 'antd'
import { HospitalController } from '../../../context/hospitalContext'
import { ListSelect } from '../../../static/own-comp'
import { provinceData, districtData, communeData, villageData, genderData } from '../../../context/headerContext'
import { convertToDistrict, convertToCommune, convertToVillage, convertHospitalToSelect } from '../../../function/fn'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_NEW_HOSPITALIZATION } from '../../../graphql/hospital'
import { ALL_HOSPIAL_INFO } from '../../../graphql/hospital'
import AddHospital from '../../hospital/modal/addHospital'
import moment from 'moment'
import {setPeopleHospital} from '../../../function/set'

const { Option } = Select

export default function AddPeopleHospital({ open, setOpen, peopleId }) {

    let [form] = Form.useForm()
    
    const [hospitalId, setHospitalId] = useState("")
    const [hospital, setHospital] = useState({})
    const [openModal, setOpenModal] = useState(false)

    const [createHospitalization, { loading }] = useMutation(CREATE_NEW_HOSPITALIZATION, {
        onCompleted: () => {
            message.success("បញ្ចូលទិន្នន័យជោគជ័យ")
        }
    })

    const { data, loading: loadingHospital, error } = useQuery(ALL_HOSPIAL_INFO, {
        onCompleted: ({ allHospitalInfos }) => {

        }
    })

    const allHospitalInfos = data?.allHospitalInfos

    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(hospital)
        console.log(hospitalId)

        if(hospitalId === 'new'){
            createHospitalization({
                variables:{...setPeopleHospital(values), personalInfo: peopleId, hospitalInfo: hospital.id}
            })
        }else {
            createHospitalization({
                variables:{...setPeopleHospital(values), personalInfo: peopleId}
            })
        }

        // //subHospitalDataDispatch({ type: 'ADD_SUB_HOSPITAL', payload: {...values, hospitalId: hospitalId} })
        // createHospitalization({
        //     variables: {
        //         in: values.in,
        //         date_in: moment(values.date_in).format(),
        //         date_out: moment(values.date_out).format(),
        //         personalInfo: values.personalInfo,
        //         hospitalInfo: hospitalId,
        //         others: values.others,
        //         // date:moment(values.date).format(),
        //         // times:values.times,
        //         // location:values.location,
        //         // result:values.result,
        //         // symptom:values.symptom,
        //         // other:values.other
        //     }
        // })

        setOpen(false)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const setToPeopleHospitalFn = (e) => {
        console.log(e)
        form.setFieldsValue({
            hospitalInfo: e
        });
        if (e === "new") {
            setOpenModal(true)
        }

        setHospitalId(e)
    };

    const callbackLocation = (e) => {
        // console.log("test",e)
        if(e === ""){
            setHospitalId(e)
            form.setFieldsValue({
                hospitalName: null
            })
        }else {
            setHospital(e)
            form.setFieldsValue({
                hospitalName: e.hospitalName
            })
        }
    }

    console.log(allHospitalInfos)

    return (
        <Modal
            title="បញ្ចូលធ្វើតេស្ត"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <AddHospital open={openModal} setOpen={setOpenModal} hospitalId={hospitalId} setHospitalId={callbackLocation} />
            <Form
                form={form}
                name="addSubHospital"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="hospitalInfo"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <ListSelect type={6} data={convertHospitalToSelect(allHospitalInfos)} title="មណ្ឌលព្យាបាល" setValue={setToPeopleHospitalFn} disabled={hospitalId === "new" ? true : false} />
                        </Form.Item>
                    </Col>
                    {
                        hospitalId === "new" ? (
                            <Col xs={24} md={{ span: 11, offset: 2 }}>
                                <Form.Item
                                    name="hospitalName"
                                >
                                    <Input disabled={true} style={{ backgroundColor: "white", color: "black" }} />
                                </Form.Item>
                            </Col>
                        ) : null
                    }

                    {/* <Col xs={24} md={{ span: 11, offset: 2 }}>
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
                    </Col> */}

                    {/* <Col xs={24} md={{ span: 11,offset:2}}>
                        <Form.Item
                            name="in"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >

                            <Select placeholder="តេស្ត" style={{ width: "100%" }}>
                                <Option value={true}>ចូល</Option>
                                <Option value={false}>ចេញ</Option>
                            </Select>
                        </Form.Item>
                    </Col> */}

                    <Col xs={24} md={hospitalId === "new" ? { span: 11, offset: 0 } : {span: 11, offset: 2}}>
                        <Form.Item
                            name="date_in"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទចូល" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={hospitalId === "new" ? { span: 11, offset: 2 } : {span: 24}}>
                        <Form.Item
                            name="date_out"
                            // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទចេញ" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 24 }}>
                        <Form.Item
                            name="others"
                        //rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
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
