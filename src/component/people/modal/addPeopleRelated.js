import React, { useContext, useState } from 'react'
import { Modal, Form, Input, Row, Col, Button, Select, Divider, DatePicker, message, Checkbox } from 'antd'
import { provinceData, districtData, communeData, villageData, genderData } from '../../../context/headerContext'
import { ListSelect } from '../../../static/own-comp'
import { convertToCommune, convertToDistrict, convertToVillage } from '../../../function/fn'
import { PeopleController } from '../../../context/peopleContext'
import { useQuery, useMutation } from '@apollo/client'
import { GET_ALL_CASES_NO_LIMIT } from '../../../graphql/case'
import { CREATE_NEW_PERSON } from '../../../graphql/people'
import { setAddPeople } from '../../../function/set'

const { Option } = Select

export default function AddPeopleRelated({ open, setOpen, caseId, setRefetch }) {


    let [form] = Form.useForm()

    const [province, setProvince] = useState("")
    const [district, setDistrict] = useState("")
    const [commune, setCommune] = useState("")
    const [allCases, setAllCases] = useState([])

    const [createPersonalInfo, { loading: loadingCreate, error: errorCreate }] = useMutation(CREATE_NEW_PERSON, {
        onCompleted: ({ createPersonalInfo }) => {
            setRefetch()
            message.success("បញ្ចូលទិន្នន័យជោគជ័យ")
            
        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    const { data, loading, error } = useQuery(GET_ALL_CASES_NO_LIMIT, {
        onCompleted: ({ allCases }) => {
            // console.log(allCases)
            setAllCases(allCases)

        }
    })

    const onFinish = (values) => {
        console.log('Success:', setAddPeople(values));

        createPersonalInfo({ variables: { ...setAddPeople(values), case: caseId,englishName: values.englishName, patientId: values.patientId, relation: values.relation, illness: values.illness  } })

        setOpen(false)
        // form.resetFields()
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
            title="បញ្ចូលអ្នកពាក់ព័ន្ធថ្មី"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                name="addPeople"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span:11 }}>
                        <Form.Item
                            name="idCard"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="អត្តសញ្ញាណប័ណ្ណ" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="patientId"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="អត្តលេខអ្នកជំងឺ" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="lastName"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="គោត្តនាម" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="firstName"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="នាម" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="gender"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >

                            <ListSelect type={0} data={genderData} title="ភេទ" setValue={setToGenderFn} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="age"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="អាយុ" type="number" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="occupation"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="មុខរបរ" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="tel"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ទូរស័ព្ទ" addonBefore="+855" type="number" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="nationality"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="សញ្ជាតិ" />
                        </Form.Item>
                    </Col>



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

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="relation"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ត្រូវជា" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset:2 }}>
                        <Form.Item
                            name="vaccinated"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input type="number" placeholder="ចំនួនចាក់វ៉ាក់សាំង" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="illness"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ជំងឺប្រចាំកាយ" />
                        </Form.Item>
                    </Col>

                    <Divider>ពាក់ព័ន្ធករណី</Divider>
                    {/* <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="case"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select placeholder="ករណី" style={{ width: "100%" }} onChange={(e)=> console.log(e)}>
                                {
                                    allCases.map((c)=>(
                                        <Option value={c.id}>{c.caseName}</Option>
                                    ))
                                }

                            </Select>
                        </Form.Item>
                    </Col> */}

                    <Col xs={24} md={{ span: 11, offset: 0 }}>
                        <Form.Item
                            name="direct"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select placeholder="លក្ខណៈពាក់ព័ន្ធ" style={{ width: "100%" }}>
                                <Option value={true}>ផ្ទាល់</Option>
                                <Option value={false}>ប្រយោល</Option>

                            </Select>
                        </Form.Item>
                    </Col>

                    {/* <Divider>ស្ថានភាពបច្ចុប្បន្ន</Divider>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="status"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select placeholder="ស្ថានភាព" style={{ width: "100%" }}>
                                <Option value="អវិជ្ជមាន">អវិជ្ជមាន</Option>
                                <Option value="វិជ្ជមាន">វិជ្ជមាន</Option>

                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11,offset:2 }}>
                        <Form.Item
                            name="date"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទ" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="direct"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select placeholder="លក្ខណៈពាក់ព័ន្ធ" style={{ width: "100%" }}>
                                <Option value={true}>ផ្ទាល់</Option>
                                <Option value={false}>ប្រយោល</Option>

                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span:11, offset:2 }}>
                        <Form.Item
                            name="otherOfStatus"
                            
                        >
                            <Input placeholder="ផ្សេងៗ" />
                        </Form.Item>
                    </Col> */}



                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="other"

                        >
                            <Input placeholder="ចំណាំ" />
                        </Form.Item>
                    </Col>


                    <Col xs={24}>
                        <Form.Item
                            name="confirm"
                            valuePropName="checked"
                        >
                            <Checkbox>សម្ភាសរួចរាល់</Checkbox>
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
