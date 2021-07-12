import React, { useContext,useEffect,useState } from 'react'
import { Modal, Form, Input, DatePicker, Row, Col, Button,Select} from 'antd';
import { UserController } from '../../../context/userContext'


const { Option } = Select;

export default function EditUser({ open, setOpen ,user}) {
    const {userData, userDataDispatch } = useContext(UserController)
    // const [user,setUser] = useState(u)

    let [form] = Form.useForm()

    console.log(user)

    // useEffect(() => {
    //     handleUser(userID)
    // }, [userID])

    // const handleUser =(id)=>{
    //     let index = userData.findIndex(e => e.id === id)
    //     console.log(userID,index)
    //     setUser(userData[index])
    // }

    const onFinish = (values) => {
        // console.log('Success:', values);

        userDataDispatch({ type: 'ADD_EDIT', payload: values })

        setOpen(false)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    console.log(user,'user')

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
                name="addUser"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >
                            <Input placeholder="ឈ្មោះសម្គាល់អ្នកប្រើប្រាស់" value={user?.username}/>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >
                            <Input placeholder="លេខកូដសម្ងាត់" style={{ width: "100%" }} value={user?.password} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 11 }}>
                        <Form.Item
                            name="role"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >

                            <Select placeholder="តួនាទី" value={user?.role} style={{ width: "100%" }}>
                                <Option value="ADMIN">ADMIN</Option>
                                <Option value="USER">USER</Option>
                               
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                        <Form.Item
                            name="tel"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="លេខទូរស័ព្ទ" value={user?.tel} />
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
                        <Form.Item
                            name="note"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="ចំណាំ" value={user?.note} />
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
