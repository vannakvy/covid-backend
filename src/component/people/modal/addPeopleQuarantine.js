import React, { useContext, useState } from 'react'
import { Form, Modal, Input, Row, Col, Button, Select, DatePicker, message } from 'antd'
import { QuarantineController } from '../../../context/quarantineContext'
import { ListSelect } from '../../../static/own-comp'
import { provinceData, districtData, communeData, villageData, genderData } from '../../../context/headerContext'
import { convertToDistrict, convertToCommune, convertToVillage, convertQurantineToSelect } from '../../../function/fn'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_PERSON_QUARANTINE } from '../../../graphql/quarantine'
import { setAddSubQuarantine } from '../../../function/set'
import { ALL_QUARANTINEINFO } from '../../../graphql/quarantine'
import moment from 'moment'
import AddQuarantine from '../../quarantine/modal/addQuarantine'

const { Option } = Select

export default function AddPeopleQuarantine({ open, setOpen, peopleId }) {
    const { subQuarantineDataDispatch } = useContext(QuarantineController)

    let [form] = Form.useForm()

    const [province, setProvince] = useState("")
    const [district, setDistrict] = useState("")
    const [commune, setCommune] = useState("")

    const [quarantineId, setQuarantineId] = useState("")
    const [quarantine, setQuarantine] = useState({})
    const [openModal, setOpenModal] = useState(false)

    const [createQuarantine, { data }] = useMutation(CREATE_PERSON_QUARANTINE, {
        onCompleted: ({ createQuarantine }) => {
            message.success("បញ្ចូលទិន្នន័យជោគជ័យ")
        }
    })

    const { data: quarantineInfo, loading: loadingQuarantine, error } = useQuery(ALL_QUARANTINEINFO, {
        onCompleted: ({ allQuarantineInfos }) => {

        }
    })

    const allQuarantineInfos = quarantineInfo?.allQuarantineInfos
    console.log(allQuarantineInfos)

    const onFinish = (values) => {
        console.log('Success:', setAddSubQuarantine(values));
        console.log(quarantine)
        console.log(quarantineId)

        if (quarantineId === 'new') {
            createQuarantine({
                variables: { ...setAddSubQuarantine(values), personalInfo: peopleId, quarantineInfo: quarantine.id }
            })
        } else {
            createQuarantine({
                variables: { ...setAddSubQuarantine(values), personalInfo: peopleId }
            })
        }

        // createQuarantine({
        //     variables: {
        //         in: values.in,
        //         date_in: moment(values.date_in).format(),
        //         date_out: moment(values.date_out).format(),
        //         personalType: values.personalType,
        //         personalInfo: values.personalInfo,
        //         quarantineInfo: quarantineId,
        //         others: values.others,
        //     }
        // })

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

    const setToQuarantineFn = (e) => {
        console.log(e)
        form.setFieldsValue({
            quarantineInfo: e
        });
        if (e === "new") {
            setOpenModal(true)
        }

        setQuarantineId(e)
    };

    const callbackLocation = (e) => {
        // console.log("test",e)
        if (e === "") {
            setQuarantineId(e)
            form.setFieldsValue({
                quarantineInfo: null
            })
        } else {
            setQuarantine(e)
            form.setFieldsValue({
                quarantineName: e.locationName
            })
        }

        console.log(e)
    }

    return (
        <Modal
            title="បញ្ចូលអ្ន​កចត្តាឡីស័ក"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <AddQuarantine open={openModal} setOpen={setOpenModal} quarantineId={quarantineId} setQuarantineId={callbackLocation} />
            <Form
                form={form}
                name="addSubCase"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="quarantineInfo"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <ListSelect type={6} data={convertQurantineToSelect(allQuarantineInfos)} title="មណ្ឌលព្យាបាល" setValue={setToQuarantineFn} disabled={quarantineId === "new" ? true : false} />
                        </Form.Item>
                    </Col>

                    {
                        quarantineId === "new" ? (
                            <Col xs={24} md={{ span: 11, offset: 2 }}>
                                <Form.Item
                                    name="quarantineName"
                                >
                                    <Input disabled={true} style={{ backgroundColor: "white", color: "black" }} />
                                </Form.Item>
                            </Col>
                        ) : null
                    }

                    <Col xs={24} md={quarantineId === "new" ? { span: 24 } : { span: 11, offset: 2 }}>
                        <Form.Item
                            name="personalType"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >

                            <Select placeholder="ប្រភេទ" style={{ width: "100%" }}>
                                <Option value="សហគមន៍">សហគមន៍</Option>
                                <Option value="តាមផ្លូងអាកាស">តាមផ្លូងអាកាស</Option>
                                <Option value="ពលករ">ពលករ</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    {/* <Col xs={24} md={{ span: 24}}>
                        <Form.Item
                            name="in"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >

                            <Select placeholder="ចត្តាឡីស័ក" style={{ width: "100%" }}>
                                <Option value={true}>ចូល</Option>
                                <Option value={false}>ចេញ</Option>
                            </Select>
                        </Form.Item>
                    </Col> */}

                    <Col xs={24} md={{ span: 11, offset: 0 }}>
                        <Form.Item
                            name="date_in"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទចូល" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="date_out"
                        // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទចេញ" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 24 }}>
                        <Form.Item
                            name="others"
                        // rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >

                            <Input placeholder="ផ្សេងៗ" />
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
