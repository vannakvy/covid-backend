import React, { useContext, useState } from 'react'
import { Modal, Form, Input, Row, Col, Button, Select, message, Table } from 'antd';
import { UserController } from '../../../context/userContext'
import { useMutation } from '@apollo/client';
import { ADD_USER_ROLE } from '../../../graphql/auth';
import { roleColumn } from '../tableColumn/roleColumn';

const { Option } = Select;

export default function AddRole({ open, setOpen,userID, dataRoles }) {
   
    const [addRole, { loading, error }] = useMutation(ADD_USER_ROLE, {
        onCompleted: ({ addRole }) => {
            message.message("បញ្ចូលបានជោគជ័យ")
        },
        onError: (error) => {
            console.log(error.message)
            message.error("បញ្ចូលបានជោគជ័យ")
        }
    })

    let [form] = Form.useForm()
    // const [data, setData] = useState(dataRoles)

    // console.log(userID)

    const onFinish = (values) => {
        // console.log('Success:', values);

        addRole({
            variables: {
                userId:userID,
                role:values.role
            }
        })

        setOpen(false)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="បញ្ចូលអតួនាទី"
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
                    <Col xs={12}>
                        <Form.Item
                            name="role"
                            rules={[{ required: true, message: 'Field is required!' }]}
                        >
                            {/* <Input placeholder="តួនាទី" /> */}
                            <Select placeholder="តួនាទី" style={{ width: "100%" }}>

                                <Option value="BASIC">BASIC</Option>
                                <Option value="ADMIN">ADMIN</Option>
                                <Option value="SUPPER">SUPPER</Option>
                                {/* <Option value="USER">USER</Option> */}
                                {/* 'BASIC','ADMIN','SUPPER','ACCOUNTANT','MARTMANAGER','CEO' */}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{span: 11, offset:1}}>
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{ width: "100%" }}
                        // onClick={()=> }
                        >
                            បញ្ចូលទិន្នន័យ
                        </Button>
                    </Col>

                    <Col xs={24}>
                        <Table
                            columns={roleColumn}
                            dataSource={dataRoles}
                            pagination={false}
                        />
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
