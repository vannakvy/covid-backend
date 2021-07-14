import React from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { LOGIN_USER, IS_LOGGED_IN } from "../graphql/auth";
import { useMutation, useQuery } from "@apollo/client";
import { isLoggedInVar } from "../cache";
import { useHistory } from "react-router-dom";

export default function Login() {
    const history = useHistory()
  const { data: isLogin } = useQuery(IS_LOGGED_IN);
  const [loginUser, { error, loading }] = useMutation(LOGIN_USER, {
    onCompleted: ({ loginUser }) => {
      localStorage.setItem("user", loginUser);
      isLoggedInVar(true);
      history.push('/')
    },
    onError: (e) => {
      console.log(e.message);
    },
  });
  const onFinish = (values) => {
    loginUser({
      variables: {
        username: values.username,
        password: values.password,
      },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      <Col
        xs={{ span: 6, offset: 9 }}
        style={{
          padding: 20,
        }}
      >
        <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
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
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
