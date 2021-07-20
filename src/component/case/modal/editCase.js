import React, {useContext, useEffect,useState} from 'react'
import { Modal, Form, Input, DatePicker, Row, Col, Button, message } from 'antd'
import {CaseController} from '../../../context/caseContext'
import {setEditCase} from '../../../function/set'
import { provinceData, districtData, communeData, villageData, genderData } from '../../../context/headerContext'
import { ListSelect } from '../../../static/own-comp'
import { convertToCommune, convertToDistrict, convertToVillage } from '../../../function/fn'
import { useMutation } from '@apollo/client'
import { UPDATE_CASE_BY_ID } from '../../../graphql/case'

export default function EditCase({ open, setOpen, data, caseId}) {
    const {caseDataDispatch} = useContext(CaseController)

    const [province, setProvince] = useState("")
    const [district, setDistrict] = useState("")
    const [commune, setCommune] = useState("")

    let [form] = Form.useForm()

    const [updateCase,{loading}] = useMutation(UPDATE_CASE_BY_ID,{
        onCompleted:()=>{
            message.success("កែប្រែទិន្នន័យជោគជ័យ")
        }
    })

    console.log(data)

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

        updateCase({
            variables:{
                caseName:values.caseName,
                village: values.village === undefined ? "ក្រៅសៀមរាប" : values.village,
                commune: values.commune === undefined ? "ក្រៅសៀមរាប" : values.commune,
                district: values.district === undefined ? "ក្រៅសៀមរាប" : values.district,
                province: values.province === undefined ? "" : values.province,
                date:values.date,
                long:values.long,
                lat:values.lat,
                other:values.other,
                id:caseId
            }
        })

        // caseDataDispatch({type: 'EDIT_CASE', payload: {...values, id: data.id}})
        // setData({...values, id: data.id})

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
            title="កែប្រែករណី"
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
                initialValues={setEditCase(data)}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{span:11}}>
                        <Form.Item
                            name="caseName"
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
