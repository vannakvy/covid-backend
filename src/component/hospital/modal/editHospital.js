import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Row, Col, Button, Divider, message } from 'antd'
import { setEditHospital } from '../../../function/set'

import { ListSelect } from '../../../static/own-comp'
import { provinceData, districtData, communeData, villageData } from '../../../context/headerContext'
import { convertToDistrict, convertToCommune, convertToVillage } from '../../../function/fn'
import { useMutation } from '@apollo/client'
import { UPDATE_HOSPITALINFO_BY_ID } from '../../../graphql/hospital'

export default function EditHospital({ open, setOpen, data, hospitalId, setRefetch }) {

    let [form] = Form.useForm()

    const [province, setProvince] = useState("")
    const [district, setDistrict] = useState("")
    const [commune, setCommune] = useState("")

    const [updateHospitalInfo, { loading }] = useMutation(UPDATE_HOSPITALINFO_BY_ID, {
        onCompleted: () => {
            if (loading) {
                message.loading("កំពុងកែប្រែទិន្នន័យ...")
            } else {
                setRefetch()
                message.success("កែប្រែទិន្នន័យជោគជ័យ")
            }

        }
    })

    useEffect(() => {

        if (data !== undefined) {
            form.setFieldsValue(setEditHospital(data))
            setProvince(data.province)
            setDistrict(data.district)
            setCommune(data.commune)
        }


    }, [data])

    const onFinish = (values) => {
        updateHospitalInfo({
            variables: {
                lat: values.lat,
                hospitalName: values.hospitalName,
                long: values.long,
                other: values.other,
                tel: values.tel,
                firstName: values.firstName,
                lastName: values.lastName,
                position: values.position,
                others: values.others,
                village: values.village === undefined ? "ក្រៅសៀមរាប" : values.village,
                commune: values.commune === undefined ? "ក្រៅសៀមរាប" : values.commune,
                district: values.district === undefined ? "ក្រៅសៀមរាប" : values.district,
                province: values.province === undefined ? "" : values.province,
                id: hospitalId
            }
        })

        setOpen(false)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const setToGenderFn = (e) => {
        form.setFieldsValue({
            gender: e
        });
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

    return (
        <Modal
            title="កែប្រែមន្ទីរពេទ្យ"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
            destroyOnClose={false}
            getContainer={false}
            forceRender
        >
            <Form
                form={form}
                name="editHospital"
                initialValues={setEditHospital(data)}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="hospitalName"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="ឈ្មោះមណ្ឌល" />
                        </Form.Item>
                    </Col>


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
                            <Col xs={24} md={{ span: 11, offset: 0 }}>
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
                            <Col xs={24} md={{ span: 24, offset: 0 }}>
                                <Form.Item
                                    name="village"
                                    rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                                >
                                    <ListSelect type={1} data={convertToVillage(commune, villageData)} title="ភូមិ" setValue={setToVillageFn} disabled={commune === "" || commune === null ? true : false} />
                                </Form.Item>
                            </Col>
                        </>
                    ) : null}

                    {/* <Col xs={24} md={{ span: 24, offset: 0 }}>
                        <Form.Item
                            name="capacity"
                        >
                            <Input type="number" placeholder="អាចផ្ទុកបាន" />
                        </Form.Item>
                    </Col> */}

                    <Col xs={24}>
                        <Form.Item
                            name="other"
                        // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
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

                    <Divider>អ្នកទទួលខុសត្រូវ</Divider>
                    <Col xs={24} md={{ span: 11, offset: 0 }}>
                        <Form.Item
                            name="firstName"
                        // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="នាម" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="lastName"
                        // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="គោត្តនាម" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 0 }}>
                        <Form.Item
                            name="position"
                        // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="តួនាទីការងារ" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="tel"
                        // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="លេខទូរស័ព្ទ" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 0 }}>
                        <Form.Item
                            name="others"
                        //rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="ផ្សេងៗ" style={{ width: "100%" }} />
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
