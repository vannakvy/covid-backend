import React, {useContext, useEffect,useState} from 'react'
import { Modal, Form, Input, DatePicker, Row, Col, Button } from 'antd'
import {CaseController} from '../../../context/caseContext'
import {setEditCase} from '../../../function/set'
import { provinceData, districtData, communeData, villageData, genderData } from '../../../context/headerContext'
import { ListSelect } from '../../../static/own-comp'
import { convertToCommune, convertToDistrict, convertToVillage } from '../../../function/fn'

export default function EditCase({ open, setOpen, data, setData }) {
    const {caseDataDispatch} = useContext(CaseController)

    const [province, setProvince] = useState("")
    const [district, setDistrict] = useState("")
    const [commune, setCommune] = useState("")

    let [form] = Form.useForm()

    useEffect(() => {
        if (data !== undefined){
            form.setFieldsValue(setEditCase(data))
            setProvince(data.province)
            setDistrict(data.district)
            setCommune(data.commune)
        }

    }, [data])

    const onFinish = (values) => {
        console.log('Success:', values);

        caseDataDispatch({type: 'EDIT_CASE', payload: {...values, id: data.id}})
        setData({...values, id: data.id})

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

    return (
        <Modal
            title="បញ្ចូលករណីថ្មី"
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
                name="editCase"
                // initialValues={setEditCase(data)}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{span:11}}>
                        <Form.Item
                            name="caseTitle"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ឈ្មោះករណី" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{span:11, offset: 2}}>
                        <Form.Item
                            name="date"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទ" style={{width: "100%"}} />
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
                        <Form.Item
                            name="place"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ទីកន្លែង" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="province"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <ListSelect type={1} data={provinceData} title="ខេត្ត/ក្រុង" setValue={setToProviceFn} />
                        </Form.Item>
                    </Col>

                    {province === "សៀមរាប" ? (
                        <>
                            <Col xs={24} md={{ span: 11, offset: 2 }}>
                                <Form.Item
                                    name="district"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <ListSelect type={0} data={convertToDistrict(districtData)} title="ស្រុក/ខណ្ឌ" setValue={setToDistrictFn} disabled={province !== "សៀមរាប" ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={{ span: 11 }}>
                                <Form.Item
                                    name="commune"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <ListSelect type={1} data={convertToCommune(district, communeData)} title="ឃុំ/សង្កាត់" setValue={setToCommuneFn} disabled={district === "" || district === null ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={{ span: 11, offset: 2 }}>
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
                        <Form.Item
                            name="remark"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ចំណាំ" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="long"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input type={1} placeholder="longtitude" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 , offset:2}}>
                        <Form.Item
                            name="lat"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input type={1} placeholder="latitude" />
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
                        <Button 
                            htmlType="submit"
                            type="primary"
                            style={{width: "100%"}}
                        >
                            បញ្ចូលទិន្នន័យ
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
