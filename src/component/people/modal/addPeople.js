import React, { useContext, useState } from 'react'
import { Modal, Form, Input, Row, Col, Button, Select } from 'antd'
import { provinceData, districtData, communeData, villageData, genderData } from '../../../context/headerContext'
import { ListSelect } from '../../../static/own-comp'
import { convertToCommune, convertToDistrict, convertToVillage } from '../../../function/fn'
import { PeopleController } from '../../../context/peopleContext'

export default function AddPeople({ open, setOpen }) {
    const { peopleDataDispatch } = useContext(PeopleController)

    let [form] = Form.useForm()

    const [province, setProvince] = useState("")
    const [district, setDistrict] = useState("")
    const [commune, setCommune] = useState("")

    const onFinish = (values) => {
        console.log('Success:', values);

        peopleDataDispatch({ type: 'ADD_PEOPLE', payload: values })

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
            title="បញ្ចូលករណីថ្មី"
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
                    <Col xs={24} md={{ span: 24 }}>
                        <Form.Item
                            name="idCard"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="អត្តសញ្ញាណប័ណ្ណ" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ឈ្មោះ" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="gender"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >

                            <ListSelect type={0} data={genderData} title="ភេទ" setValue={setToGenderFn} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="age"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="អាយុ" type="number" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="job"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="មុខរបរ" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="tel"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ទូរស័ព្ទ" addonBefore="+855" type="number" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="nationality"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="សញ្ជាតិ" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="remark"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ចំណាំ" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 , offset: 2}}>
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
