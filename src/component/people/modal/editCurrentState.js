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
import { UPDATE_CURRENTSTATE_BY_ID } from '../../../graphql/people'

const { Option } = Select

export default function EditCurrentState({ open, setOpen, peopleId, setRefetch, currentStateData}) {
    const { subQuarantineDataDispatch } = useContext(QuarantineController)

    let [form] = Form.useForm()

    const [province, setProvince] = useState("")
    const [district, setDistrict] = useState("")
    const [commune, setCommune] = useState("")

    const [quarantineId, setQuarantineId] = useState("")
    const [quarantine, setQuarantine] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [dateKey, setDateKey] = useState("")

    const [updateCurrentState, { data }] = useMutation(UPDATE_CURRENTSTATE_BY_ID, {
        onCompleted: ({ updateCurrentState }) => {
            setRefetch()
            message.success("កែប្រែទិន្នន័យជោគជ័យ")
        }
    })

    const { data: quarantineInfo, loading: loadingQuarantine, error } = useQuery(ALL_QUARANTINEINFO, {
        onCompleted: ({ allQuarantineInfos }) => {

        }
    })

    const allQuarantineInfos = quarantineInfo?.allQuarantineInfos
    console.log(allQuarantineInfos)

    const onFinish = (values) => {
        console.log('Success:', values);
        let newObj = {...currentStateData,personalInfoId: peopleId}
        switch(values.currentState){
            case 'វិជ្ជមាន':
                newObj = {...newObj,confirm: true, confirmedAt:moment(values.date)}
                break;
            case 'ជាសះស្បើយ':
                newObj = {...newObj,recovered: true, recoveredAt: moment(values.date)}
                break;
            case 'ស្លាប់':
                newObj = {...newObj,death: true, deathAt:moment(values.date)}
                break;
            default:
                newObj = {...newObj,confirm: false, confirmedAt:moment(values.date)}
                break;
        }

        console.log(newObj)

        updateCurrentState({
            variables:newObj
        })

        // if (quarantineId === 'new') {
        //     createQuarantine({
        //         variables: { ...setAddSubQuarantine(values), personalInfo: peopleId, quarantineInfo: quarantine.id }
        //     })
        // } else {
        //     createQuarantine({
        //         variables: { ...setAddSubQuarantine(values), personalInfo: peopleId }
        //     })
        // }

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

    const handleStateChange=e=>{
        console.log(e)
        switch(e){
            case 'វិជ្ជមាន':
                setDateKey("confirmedAt")
                break;
            case 'ជាសះស្បើយ':
                setDateKey("recoveredAt")
                break;
            case 'ស្លាប់':
                setDateKey("deathAt")
                break;
            default:
                setDateKey("")
                break;
        }
    }

    return (
        <Modal
            title="កែប្រស្ថានភាពបច្ចុប្បន្ន"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            {/* <AddQuarantine open={openModal} setOpen={setOpenModal} quarantineId={quarantineId} setQuarantineId={callbackLocation} /> */}
            <Form
                form={form}
                name="addSubCase"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="currentState"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            
                        >
                           <Select onChange={(e)=> handleStateChange(e)} placeholder="ស្ថានភាព" style={{ width: "100%" }}>
                                {/* <Option value="អវិជ្ជមាន">អវិជ្ជមាន</Option> */}
                                <Option value="វិជ្ជមាន">វិជ្ជមាន</Option>
                                <Option value="ជាសះស្បើយ">ជាសះស្បើយ</Option>
                                <Option value="ស្លាប់">ស្លាប់</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="date"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទចូល" style={{ width: "100%" }} />
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
