import React, { useState } from 'react'
import { Modal, Form, Input, Row, Col, Button, message } from 'antd'
import { provinceData, districtData, communeData, villageData} from '../../../context/headerContext'
import { ListSelect } from '../../../static/own-comp'
import { convertToCommune, convertToDistrict, convertToVillage } from '../../../function/fn'
import { CREATE_NEW_LOCATION } from '../../../graphql/location'
// import { GET_ALL_CASES_NO_LIMIT } from '../../../graphql/case'
// import { GET_ALL_PERSONINFO_NO_LIMIT } from '../../../graphql/people'
import { useMutation } from '@apollo/client'
import moment from 'moment'

export default function AddLocation({ open, setOpen, setRefetch, locationId, setLocationId }) {


    const [province, setProvince] = useState("")
    const [district, setDistrict] = useState("")
    const [commune, setCommune] = useState("")
    // const [allCases, setAllCases] = useState([])
    // const [peopleData, setPeopleData] = useState([])

    console.log(locationId)

    //const { caseDataDispatch } = useContext(CaseController)
    const [createAffectedLocation, { loading: createLoading }] = useMutation(CREATE_NEW_LOCATION, {
        onCompleted: ({ createAffectedLocation }) => {
            if (createLoading) {
                message.loading("កំពុងបញ្ចូលទិន្នន័យ...")
            } else {
                message.success("បញ្ចូលទិន្នន័យជោគជ័យ")

                if (locationId === "new") {
                    setLocationId(createAffectedLocation.affectedLocation)
                } else {
                    setRefetch()
                }
            }

        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    // const { data} = useQuery(GET_ALL_CASES_NO_LIMIT, {
    //     onCompleted: ({ allCases }) => {
    //         setAllCases(allCases)
    //     }
    // })

    // const { data: people } = useQuery(GET_ALL_PERSONINFO_NO_LIMIT, {
    //     onCompleted: ({ allPersonalInfos }) => {
    //         // console.log(allPersonalInfos)
    //         setPeopleData(allPersonalInfos)
    //     }
    // })

    let [form] = Form.useForm()

    const onFinish = (values) => {
        createAffectedLocation({
            variables: {
                affectedLocationName: values.affectedLocationName,
                village: values.village === undefined ? "ក្រៅសៀមរាប" : values.village,
                commune: values.commune === undefined ? "ក្រៅសៀមរាប" : values.commune,
                district: values.district === undefined ? "ក្រៅសៀមរាប" : values.district,
                province: values.province === undefined ? "" : values.province,
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

    // const setToCaseFn = (e) => {
    //     form.setFieldsValue({
    //         case: e
    //     });
    // };

    // const setToPeopleFn = (e) => {
    //     form.setFieldsValue({
    //         personalInfo: e
    //     });
    // };

    const setPeopleLocationFn = () => {
        setOpen(false)
        setLocationId("")
        console.log(locationId)
    }

    return (
        <Modal
            title="បញ្ចូលទីតាំង"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => locationId === "new" ? setPeopleLocationFn() : setOpen(false)}
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
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
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
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <ListSelect type={1} data={provinceData} title="ខេត្ត/ក្រុង" setValue={setToProviceFn} />
                        </Form.Item>
                    </Col>

                    {province === "សៀមរាប" ? (
                        <>
                            <Col xs={24} md={{ span: 11 }}>
                                <Form.Item
                                    name="district"
                                    rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                                >
                                    <ListSelect type={0} data={convertToDistrict(districtData)} title="ស្រុក/ខណ្ឌ" setValue={setToDistrictFn} disabled={province !== "សៀមរាប" ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={{ span: 11, offset: 2 }}>
                                <Form.Item
                                    name="commune"
                                    rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                                >
                                    <ListSelect type={1} data={convertToCommune(district, communeData)} title="ឃុំ/សង្កាត់" setValue={setToCommuneFn} disabled={district === "" || district === null ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={{ span: 24 }}>
                                <Form.Item
                                    name="village"
                                    rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                                >
                                    <ListSelect type={1} data={convertToVillage(commune, villageData)} title="ភូមិ" setValue={setToVillageFn} disabled={commune === "" || commune === null ? true : false} />
                                </Form.Item>
                            </Col>
                        </>
                    ) : null}

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
                        // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input type="number" placeholder="longtitude" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="lat"
                        // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
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
