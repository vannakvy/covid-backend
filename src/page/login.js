import React from 'react'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import {LOGIN_USER} from '../graphql/auth'
import {useMutation} from '@apollo-client'
export default function Login() {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row>
            <Col
                xs={{span:6, offset: 9}}
                style={{
                    padding: 20
                }}
            >
                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{width: "100%"}}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>

    );
}