import React, { useContext } from 'react'
import { Modal, Form, Input, Row, Col, Button, Select, message } from 'antd';
import { UserController } from '../../../context/userContext'
import { setEditUser } from '../../../function/set';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_DETAIL } from '../../../graphql/auth';

const { Option } = Select;

export default function EditUser({ open, setOpen, data }) {
    //const { userDataDispatch } = useContext(UserController)

    const [updateUserDetail, { loading, error }] = useMutation(UPDATE_USER_DETAIL,{
        onCompleted:({updateUserDetail})=>{
            console.log(updateUserDetail)
            message.success("កែប្រែបានជោគជ័យ")
        },
        onError:(error)=>{
            console.log(error.message)
            message.success("កែប្រែមានបញ្ហា!")
        }
    })

    let [form] = Form.useForm()

    

    const onFinish = (values) => {

        console.log(values)
        updateUserDetail({variables:{
            userId:data.id,
            firstName:values.firstName,
            lastName:values.lastName,
            email:values.email,
            tel:values.tel,
        }})

        
        setOpen(false)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="កែប្រេអ្នកប្រើប្រាស់"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                name="editUser"
                fields={[
                    {
                        name: ['username'],
                        value: data.username,
                    },
                    {
                        name: ['firstName'],
                        value: data.firstName,
                    },
                    {
                        name: ['lastName'],
                        value: data.lastName,
                    },
                    {
                        name: ['tel'],
                        value: data.tel,
                    },
                    {
                        name: ['email'],
                        value: data.email,
                    },
                    

                ]}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >
                            <Input placeholder="ឈ្មោះសម្គាល់អ្នកប្រើប្រាស់" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >
                            <Input placeholder="លេខកូដសម្ងាត់" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="firstName"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >
                            <Input placeholder="នាម" />
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

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="tel"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="លេខទូរស័ព្ទ" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="email"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input type="email" placeholder="អ៊ីម៉ែល" />
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
        </Modal >
    )
}
