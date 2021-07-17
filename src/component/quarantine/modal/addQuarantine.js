import React, { useContext,useState,useEffect } from 'react'
import { Modal, Form, Input, Row, Col, Button,Select, Divider, message} from 'antd';
import { QuarantineController } from '../../../context/quarantineContext'
import { ListSelect } from '../../../static/own-comp'
import { provinceData, districtData, communeData, villageData } from '../../../context/headerContext'
import { convertToDistrict, convertToCommune, convertToVillage } from '../../../function/fn'
import { useMutation } from '@apollo/client';
import { CREATE_QUARANTINEINFO } from '../../../graphql/quarantine';
import { setAddQuarantine } from '../../../function/set';

const { Option } = Select;

export default function AddQuarantine({ open, setOpen }) {
    //const { quarantineDataDispatch } = useContext(QuarantineController)

    let [form] = Form.useForm()

    const [province, setProvince] = useState("")
    const [district, setDistrict] = useState("")
    const [commune, setCommune] = useState("")

    const [createQuarantineInfo,{loading,error}]=useMutation(CREATE_QUARANTINEINFO,{
        onCompleted:({createQuarantineInfo})=>{
            message.success("បញ្ចូលបានជោគជ័យ")
        },
        onError:()=>{
            message.error("បញ្ចូលបរាជ័យ")
        }
    })

    const onFinish = (values) => {
        // console.log('Success:', values);

        //quarantineDataDispatch({ type: 'ADD_QUARANTINE', payload: values })

        createQuarantineInfo({variables:setAddQuarantine(values)})

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
            title="បញ្ចូលមណ្ឌលចត្តាឡីស័កថ្មី"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                name="addUser"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="locationName"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >
                            <Input placeholder="ឈ្មោះមណ្ឌល" />
                        </Form.Item>
                    </Col>
                    

                    <Col xs={24} md={{ span: 11, offset:2 }}>
                        <Form.Item
                            name="province"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >
                            <ListSelect type={1} data={provinceData} title="ខេត្ត/ក្រុង" setValue={setToProviceFn} />
                        </Form.Item>
                    </Col>

                    {province === "សៀមរាប" ? (
                        <>
                            <Col xs={24} md={{ span: 11, offset: 0 }}>
                                <Form.Item
                                    name="district"
                                    rules={[{ required: true, message: 'Field is required!' }]}
                                >
                                    <ListSelect type={0} data={convertToDistrict(districtData)} title="ស្រុក/ខណ្ឌ" setValue={setToDistrictFn} disabled={province !== "សៀមរាប" ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={{ span: 11, offset: 2 }}>
                                <Form.Item
                                    name="commune"
                                    rules={[{ required: true, message: 'Field is required!' }]}
                                >
                                    <ListSelect type={1} data={convertToCommune(district, communeData)} title="ឃុំ/សង្កាត់" setValue={setToCommuneFn} disabled={district === "" || district === null ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={{ span: 24, offset: 0 }}>
                                <Form.Item
                                    name="village"
                                    rules={[{ required: true, message: 'Field is required!' }]}
                                >
                                    <ListSelect type={1} data={convertToVillage(commune, villageData)} title="ភូមិ" setValue={setToVillageFn} disabled={commune === "" || commune === null ? true : false} />
                                </Form.Item>
                            </Col>
                        </>
                    ) : null}

                    <Col xs={24}>
                        <Form.Item
                            name="other"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
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

                    <Col xs={24} md={{ span: 11 , offset:2}}>
                        <Form.Item
                            name="lat"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input type="number" placeholder="latitude" />
                        </Form.Item>
                    </Col>

                    <Divider>អ្នកទទួលខុសត្រូវ</Divider>
                    <Col xs={24} md={{ span: 11, offset: 0 }}>
                        <Form.Item
                            name="firstName"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >
                            <Input placeholder="នាម" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="lastName"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >
                            <Input placeholder="គោត្តនាម" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 0 }}>
                        <Form.Item
                            name="position"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >
                            <Input placeholder="តួនាទីការងារ" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="tel"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >
                            <Input placeholder="លេខទូរស័ព្ទ" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 0 }}>
                        <Form.Item
                            name="others"
                            //rules={[{ required: true, message: 'Field is required!' }]}
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
                            បញ្ចូលទិន្នន័យ
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
