import React, { useContext, useState, useEffect } from 'react'
import { Modal, Form, Input, Row, Col, Button, Select, Divider, DatePicker, message, Checkbox } from 'antd'
import { provinceData, districtData, communeData, villageData, genderData, nationalityData } from '../../../context/headerContext'
import { ListSelect } from '../../../static/own-comp'
import { convertToCommune, convertToDistrict, convertToVillage } from '../../../function/fn'
import { useQuery, useMutation } from '@apollo/client'
import { GET_ALL_CASES_NO_LIMIT } from '../../../graphql/case'
import { CREATE_NEW_PERSON } from '../../../graphql/people'
import { UPDATE_PERSON_BY_ID } from '../../../graphql/people'
import { setEditPeople } from '../../../function/set'
import AddCase from '../../case/modal/addCase'

const { Option } = Select

export default function EditPeople({ open, setOpen, personId, personalData, setRefetch }) {

    // console.log(personalData)
    let [form] = Form.useForm()

    const [province, setProvince] = useState("")
    const [district, setDistrict] = useState("")
    const [commune, setCommune] = useState("")
    const [caseId, setCaseId] = useState("")
    const [caseData, setCaseData] = useState({})
    const [allCases, setAllCases] = useState([])

    const [openModal, setOpenModal] = useState(false)

    const [updatePersonalInfo, { loading: loadingCreate, error: errorCreate }] = useMutation(UPDATE_PERSON_BY_ID, {
        onCompleted: ({ createPersonalInfo }) => {
            setRefetch()
            message.success("កែប្រែទិន្នន័យជោគជ័យ")
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

    useEffect(() => {
        form.resetFields()
        if (personalData !== undefined) {

            // form.setFieldsValue(setEditCase(personalData))
            setProvince(personalData?.province)
            setDistrict(personalData?.district)
            setCommune(personalData?.commune)
        }

    }, [personalData, open])

    const onFinish = (values) => {
        console.log('Success:', { ...setEditPeople(values), case: caseData.id,englishName: values.englishName, patientId: values.patientId, relation: values.relation, illness: values.illness});
        // illness: values.illness
        updatePersonalInfo({
            variables: {
                firstName: values.firstName,
                lastName: values.lastName,
                age: parseInt(values.age),
                gender: values.gender,
                tel: values.tel,
                nationality: values.nationality,
                occupation: values.occupation,
                idCard: values.idCard,
                village: values.village === undefined ? "ក្រៅសៀមរាប" : values.village,
                commune: values.commune === undefined ? "ក្រៅសៀមរាប" : values.commune,
                district: values.district === undefined ? "ក្រៅសៀមរាប" : values.district,
                province: values.province === undefined ? "" : values.province,
                case: personalData?.case?.id,
                other: values.other,
                vaccinated: parseInt(values.vaccinated),
                interviewed: values.interviewed,
                id: personId,
                englishName: values.englishName,
                patientId: values.patientId,
                relation: values.relation,
                illness: values.illness
            }
        })

        // if(caseId === 'new'){
        //     createPersonalInfo({ variables: {...setAddPeople(values), case: caseData.id} })
        // }else {

        // createPersonalInfo({ variables: setAddPeople(values) })
        // }

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

    const setToNationalityFn = (e) => {
        form.setFieldsValue({
            nationality: e
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

    const setToCaseFn = (e) => {
        form.setFieldsValue({
            case: e
        });
        if (e === "new") {
            setOpenModal(true)
        }

        setCaseId(e)
    };

    const callbackCase = (e) => {
        if (e === "") {
            setCaseId(e)
            form.setFieldsValue({
                case: null
            })
        } else {
            setCaseData(e)
            form.setFieldsValue({
                caseName: e.caseName
            })
        }
    }

    return (
        <Modal
            title="កែប្រែប្រជាជន"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}

        >
            {/* <AddCase open={openModal} setOpen={setOpenModal} caseId={caseId}  /> */}
            <Form
                form={form}
                name="addPeople"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={personalData}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="idCard"
                        // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="អត្តសញ្ញាណប័ណ្ណ" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="patientId"
                        // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="អត្តលេខអ្នកជំងឺ" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="lastName"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="គោត្តនាម" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="firstName"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="នាម" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 24 }}>
                        <Form.Item
                            name="englishName"
                        // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="ឈ្មោះជាភាសាឡាតាំង" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="gender"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >

                            <ListSelect type={0} data={genderData} title="ភេទ" setValue={setToGenderFn} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="age"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="អាយុ" type="number" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="occupation"
                            // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="មុខរបរ" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="tel"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="ទូរស័ព្ទ" addonBefore="+855" type="number" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="nationality"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <ListSelect type={0} data={nationalityData} title="សញ្ជាតិ" setValue={setToNationalityFn} />
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

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="relation"
                        // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="ត្រូវជា" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 24 }}>
                        <Form.Item
                            name="vaccinated"
                            // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input type="number" placeholder="ចំនួនចាក់វ៉ាក់សាំង" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="illness"
                        // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="ជំងឺបច្ចុប្បន្ន" />
                        </Form.Item>
                    </Col>


                    <Col xs={24} md={{ span: 24 }}>
                        <Form.Item
                            name="other"

                        >
                            <Input placeholder="ចំណាំ" />
                        </Form.Item>
                    </Col>


                    <Col xs={24}>
                        <Form.Item
                            name="interviewed"
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
