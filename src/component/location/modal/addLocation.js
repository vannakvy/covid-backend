import React, { useContext, useState } from 'react'
import { Modal, Form, Input, DatePicker, Row, Col, Button, message } from 'antd'
import { CaseController } from '../../../context/caseContext'
import { provinceData, districtData, communeData, villageData, genderData } from '../../../context/headerContext'
import { ListSelect } from '../../../static/own-comp'
import { convertToCommune, convertToDistrict, convertToVillage } from '../../../function/fn'
import { CREATE_NEW_LOCATION} from '../../../graphql/location'
import { GET_ALL_CASES_NO_LIMIT } from '../../../graphql/case'
import { GET_ALL_PERSONINFO_NO_LIMIT } from '../../../graphql/people'
import { useMutation,useQuery } from '@apollo/client'
import moment from 'moment'

export default function AddLocation({ open, setOpen, refetch }) {

    
    const [province, setProvince] = useState("")
    const [district, setDistrict] = useState("")
    const [commune, setCommune] = useState("")
    const [allCases,setAllCases] = useState([])
    const [peopleData,setPeopleData]= useState([])

    //const { caseDataDispatch } = useContext(CaseController)
    const [createCase, { loading:createLoading}] = useMutation(CREATE_NEW_LOCATION, {
        onCompleted: ({ createCase }) => {
            refetch();
            message.success("បញ្ចូលទិន្នន័យជោគជ័យ")
        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    const {data,loading} = useQuery(GET_ALL_CASES_NO_LIMIT,{
        onCompleted:({allCases})=>{
            console.log(allCases)
            setAllCases(allCases)
        }
    })

    const {data:people} = useQuery(GET_ALL_PERSONINFO_NO_LIMIT,{
        onCompleted:({allPersonalInfos})=>{
            // console.log(allPersonalInfos)
            setPeopleData(allPersonalInfos)
        }
    })

    let [form] = Form.useForm()

    const onFinish = (values) => {
        console.log('Success:', values);

        // createCase({
        //     variables: {
        //         caseName: values.caseName,
        //         village: values.village === undefined ? "ក្រៅសៀមរាប" : values.village,
        //         commune: values.commune === undefined ? "ក្រៅសៀមរាប" : values.commune,
        //         district: values.district === undefined ? "ក្រៅសៀមរាប" : values.district,
        //         province: values.province === undefined ? "ក្រៅសៀមរាប" : values.province,
        //         date: moment(values.date).format(),
        //         lat: parseFloat(values.lat),
        //         long: parseFloat(values.long),
        //         other: values.other,
        //     }
        // })

        setOpen(false)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const setToProviceFn = (e) => {
        form.setFieldsValue({
            province: e,
            district: null,
            commune: null,
            village: null,
        });

        setProvince(e)
        setDistrict("")
        setCommune("")
    };


    const setToDistrictFn = (e) => {
        form.setFieldsValue({
            district: e,
            commune: null,
            village: null,
        });

        setDistrict(e)
        setCommune("")
    };

    const setToCommuneFn = (e) => {
        form.setFieldsValue({
            commune: e,
            village: null,
        });

        setCommune(e)
    };

    const setToVillageFn = (e) => {
        form.setFieldsValue({
            village: e
        });
    };

    const setToCaseFn = (e) => {
        form.setFieldsValue({
            case: e
        });
    };


    const setToPeopleFn = (e) => {
        form.setFieldsValue({
            personalInfo: e
        });
    };

    return (
        <Modal
            title="បញ្ចូលទីតាំង"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                name="addCase"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="affectedLocationName"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ទីតាំង" />
                        </Form.Item>
                    </Col>

                    

                    {/* <Select placeholder="លទ្ធផល" style={{ width: "100%" }}>
                        <Option value={true}>វិជ្ជមាន</Option>
                        <Option value={false}>អវិជ្ជមាន</Option>
                    </Select> */}

                    <Col xs={24} md={{span: 11,offset:2 }}>
                        <Form.Item
                            name="province"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <ListSelect type={1} data={provinceData} title="ខេត្ត/ក្រុង" setValue={setToProviceFn} />
                        </Form.Item>
                    </Col>

                    {province === "សៀមរាប" ? (
                        <>
                            <Col xs={24} md={{ span: 11}}>
                                <Form.Item
                                    name="district"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <ListSelect type={0} data={convertToDistrict(districtData)} title="ស្រុក/ខណ្ឌ" setValue={setToDistrictFn} disabled={province !== "សៀមរាប" ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={{ span: 11,offset:2 }}>
                                <Form.Item
                                    name="commune"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <ListSelect type={1} data={convertToCommune(district, communeData)} title="ឃុំ/សង្កាត់" setValue={setToCommuneFn} disabled={district === "" || district === null ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={{ span: 24}}>
                                <Form.Item
                                    name="village"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <ListSelect type={1} data={convertToVillage(commune, villageData)} title="ភូមិ" setValue={setToVillageFn} disabled={commune === "" || commune === null ? true : false} />
                                </Form.Item>
                            </Col>
                        </>
                    ) : null}

                    <Col xs={24} md={{ span: 11}}>
                        <Form.Item
                            name="case"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <ListSelect type={3} data={allCases} title="ករណី" setValue={setToCaseFn}/>
                        </Form.Item>
                    </Col>

                        
                    <Col xs={24} md={{ span: 11,offset:2}}>
                        <Form.Item
                            name="personalInfo"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                        <ListSelect type={2} data={peopleData} title="អ្នកឆ្លង" setValue={setToPeopleFn}/>
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
                        <Form.Item
                            name="other"
                        >
                            <Input placeholder="ចំណាំ" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="long"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input type="number" placeholder="longtitude" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="lat"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input type="number" placeholder="latitude" />
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
