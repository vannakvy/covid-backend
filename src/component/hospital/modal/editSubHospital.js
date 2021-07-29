import React, { useEffect } from 'react'
import { Form, Modal, Input, Row, Col, Button, DatePicker, message } from 'antd'
import { ListSelect } from '../../../static/own-comp'
import { setEditSubHospital } from '../../../function/set'
import { useMutation } from '@apollo/client'
import { UPDATE_PERSON_BY_HOSPITALINFO } from '../../../graphql/hospital'
import moment from 'moment'

export default function EditSubHospital({ open, setOpen, data, hospitalId, peopleData, setRefetch }) {

    let [form] = Form.useForm()

    const [updateHospitalization, { loading }] = useMutation(UPDATE_PERSON_BY_HOSPITALINFO, {
        onCompleted: () => {
            if(loading){
                message.loading("កំពុងកែប្រែទិន្នន័យ...")
            }else{
                setRefetch()
                message.success("កែប្រែទិន្នន័យជោគជ័យ")
            }
            
        }
    })

    useEffect(() => {
        form.setFieldsValue(setEditSubHospital(data))
    }, [data])

    const onFinish = (values) => {
        // console.log('Success:', values,data.id);
        updateHospitalization({
            variables: {
                in: values.in,
                date_in: moment(values.date_in).format(),
                date_out: values.date_out === undefined || values.date_out === null  ? null : moment(values.date_out).format(),
                // out_status:String,
                personalInfo: values.personalInfo,
                hospitalInfo: hospitalId,
                others: values.others,
                id: data.id
            }
        })

        setOpen(false)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const setToPeopleFn = (e) => {
        form.setFieldsValue({
            personalInfo: e
        });
    };


    return (
        <Modal
            title="កែប្រែអ្នកជំងឺ"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                name="editSubHospital"
                // initialValues={setEditSubHospital(data)}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="personalInfo"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <ListSelect type={2} data={peopleData} title="អ្នកធ្វើតេស្ត" setValue={setToPeopleFn} />
                            {/* <Select placeholder="អ្នកចត្តាឡីស័ក" style={{ width: "100%" }} onChange={(e) => console.log(e)}>
                                {peopleData.map((people) => (
                                    <Option key={people?.id} value={people?.id}>{people?.lastName} {people?.firstName}</Option>
                                ))}

                            </Select> */}
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="date_in"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទចូល" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 24 }}>
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
                            កែប្រែទិន្នន័យ
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
