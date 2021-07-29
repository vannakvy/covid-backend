import React, { useState } from 'react'
import { Form, Modal, Input, Row, Col, Button, Select, DatePicker, message } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_QUARANTINEINFO } from '../../../graphql/quarantine'
import moment from 'moment'
import { UPDATE_CURRENTSTATE_BY_ID } from '../../../graphql/people'

const { Option } = Select

export default function EditCurrentState({ open, setOpen, peopleId, setRefetch, currentStateData}) {

    let [form] = Form.useForm()

    const [updateCurrentState, { data }] = useMutation(UPDATE_CURRENTSTATE_BY_ID, {
        onCompleted: ({ updateCurrentState }) => {
            setRefetch()
            message.success("កែប្រែទិន្នន័យជោគជ័យ")
        }
    })

    const onFinish = (values) => {

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
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                            
                        >
                           <Select placeholder="ស្ថានភាព" style={{ width: "100%" }}>
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
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
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
