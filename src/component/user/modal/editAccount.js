import React, { useContext } from 'react'
import { Modal, Form, Input, Row, Col, Button, Select, message } from 'antd';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_DETAIL } from '../../../graphql/auth';
import { EyeTwoTone,EyeInvisibleOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function EditAccount({ open, setOpen, data,setRefetch }) {
    //const { userDataDispatch } = useContext(UserController)

    const [updateUserDetail, { loading, error }] = useMutation(UPDATE_USER_DETAIL,{
        onCompleted:({updateUserDetail})=>{
            setRefetch()
            message.success("កែប្រែបានជោគជ័យ")
        },
        onError:(error)=>{
            message.success("កែប្រែមានបញ្ហា!")
        }
    })

    let [form] = Form.useForm()

    const onFinish = (values) => {

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
            title="កែប្រែលេខសម្ងាត់"
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
                    // {
                    //     name: ['firstName'],
                    //     value: data.firstName,
                    // },
                    // {
                    //     name: ['lastName'],
                    //     value: data.lastName,
                    // },
                    // {
                    //     name: ['tel'],
                    //     value: data.tel,
                    // },
                    // {
                    //     name: ['email'],
                    //     value: data.email,
                    // },
                    

                ]}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="ឈ្មោះសម្គាល់អ្នកប្រើប្រាស់" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input.Password placeholder="លេខកូដសម្ងាត់" style={{ width: "100%" }} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11}}>
                        <Form.Item
                            name="cfpassword"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input.Password placeholder="បញ្ជាក់លេខកូដសម្ងាត់" style={{ width: "100%" }} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
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
