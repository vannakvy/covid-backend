import React, { useContext } from 'react'
import { Modal, Form, Input, Row, Col, Button,Select, message} from 'antd';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../../graphql/auth';

const { Option } = Select;

export default function AddUser({ open, setOpen,setRefetch }) {

    const [registerUser,{loading,error}] = useMutation(REGISTER_USER,{
        onCompleted:({registerUser})=>{
            setRefetch()
            message.success("បញ្ចូលបានជោគជ័យ")
            setOpen(false)
        },
        onError:(error)=>{
            console.log(error.message)
        }
    })

    let [form] = Form.useForm()

    const onFinish = (values) => {

        registerUser({
            variables:{

                username:values.username,
                password:values.password,
                firstname:values.firstname,
                lastname:values.lastname,
                email:values.email,
                role:values.role,
                tel:values.tel

            }
        })

        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="បញ្ចូលអ្នកប្រើប្រាស់ថ្មី"
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
                            <Input placeholder="លេខកូដសម្ងាត់" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="firstname"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="នាម" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="lastname"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            <Input placeholder="គោត្តនាម" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="role"
                            rules={[{ required: true, message: 'ត្រូវបំពេញប្រអប់ខាងលើ!' }]}
                        >
                            {/* <Input placeholder="តួនាទី" /> */}
                            <Select placeholder="តួនាទី" style={{ width: "100%" }}>
                            <Option value="BASIC">BASIC</Option>
                                <Option value="ADMIN">ADMIN</Option>
                                <Option value="SUPPER">SUPPER</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="tel"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="លេខទូរស័ព្ទ" />
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
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
                            // onClick={()=> }
                        >
                            បញ្ចូលទិន្នន័យ
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
