import React, { useContext, useState } from 'react'
import { Modal, Form, Input, DatePicker, Row, Col, Button, message } from 'antd'
import { CaseController } from '../../../context/caseContext'
import { provinceData, districtData, communeData, villageData, genderData } from '../../../context/headerContext'
import { ListSelect } from '../../../static/own-comp'
import { convertToCommune, convertToDistrict, convertToVillage, convertEditData } from '../../../function/fn'
import { UPDATE_AFFECTEDLOCATION_BY_ID } from '../../../graphql/location'
import { GET_ALL_CASES_NO_LIMIT } from '../../../graphql/case'
import { GET_ALL_PERSONINFO_NO_LIMIT } from '../../../graphql/people'
import { useMutation, useQuery } from '@apollo/client'
import moment from 'moment'

export default function AddLocation({ open, setOpen, setRefetch, dataEdit }) {


    const [province, setProvince] = useState("")
    const [district, setDistrict] = useState("")
    const [commune, setCommune] = useState("")
    const [allCases, setAllCases] = useState([])
    const [peopleData, setPeopleData] = useState([])

    //const { caseDataDispatch } = useContext(CaseController)
    const [updateAffectedLocation, { loading: createLoading }] = useMutation(UPDATE_AFFECTEDLOCATION_BY_ID, {
        onCompleted: ({ updateAffectedLocation }) => {
            message.success("បញ្ចូលទិន្នន័យជោគជ័យ")
        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    const { data, loading } = useQuery(GET_ALL_CASES_NO_LIMIT, {
        onCompleted: ({ allCases }) => {
            console.log(allCases)
            setAllCases(allCases)
        }
    })

    const { data: people } = useQuery(GET_ALL_PERSONINFO_NO_LIMIT, {
        onCompleted: ({ allPersonalInfos }) => {
            // console.log(allPersonalInfos)
            setPeopleData(allPersonalInfos)
        }
    })

    let [form] = Form.useForm()

    const onFinish = (values) => {
        console.log('Success:', values);
        updateAffectedLocation({
            variables: {
                id: dataEdit.id,
                affectedLocationName: values.affectedLocationName,
                village: values.village === undefined ? "ក្រៅសៀមរាប" : values.village,
                commune: values.commune === undefined ? "ក្រៅសៀមរាប" : values.commune,
                district: values.district === undefined ? "ក្រៅសៀមរាប" : values.district,
                province: values.province === undefined ? "" : values.province,
                openAt: values.openAt === undefined ? null : moment(values.openAt),
                closeAt: values.closeAt === undefined ? null : moment(values.closeAt),
                other: values.other,
                long: parseFloat(values.long),
                lat: parseFloat(values.lat),
            }
        })

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

    // console.log(convertEditData(dataEdit))

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
                fields={convertEditData(dataEdit)}
                // fields={[
                //     {
                //         name: "closeAt",
                //         value: moment()
                //     }
                // ]}
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

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="province"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <ListSelect type={1} data={provinceData} title="ខេត្ត/ក្រុង" setValue={setToProviceFn} />
                        </Form.Item>
                    </Col>

                    {province === "សៀមរាប" ? (
                        <>
                            <Col xs={24} md={{ span: 11 }}>
                                <Form.Item
                                    name="district"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <ListSelect type={0} data={convertToDistrict(districtData)} title="ស្រុក/ខណ្ឌ" setValue={setToDistrictFn} disabled={province !== "សៀមរាប" ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={{ span: 11, offset: 2 }}>
                                <Form.Item
                                    name="commune"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <ListSelect type={1} data={convertToCommune(district, communeData)} title="ឃុំ/សង្កាត់" setValue={setToCommuneFn} disabled={district === "" || district === null ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={{ span: 24 }}>
                                <Form.Item
                                    name="village"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <ListSelect type={1} data={convertToVillage(commune, villageData)} title="ភូមិ" setValue={setToVillageFn} disabled={commune === "" || commune === null ? true : false} />
                                </Form.Item>
                            </Col>
                        </>
                    ) : null}
                    
                    <Col xs={24} md={{span: 11, offset: 0}}>
                        <Form.Item
                            name="closeAt"
                        >
                            <DatePicker 
                                placeholder="កាលបរិច្ឆេទបិទ"
                                style={{width: "100%"}}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{span: 11, offset: 2}}>
                        <Form.Item
                            name="openAt"
                        >
                            <DatePicker 
                                placeholder="កាលបរិច្ឆេទបើក"
                                style={{width: "100%"}}
                            />
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
