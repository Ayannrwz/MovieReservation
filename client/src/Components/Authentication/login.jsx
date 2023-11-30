import React from "react";
// import "../../Styles/authentication.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import '@fortawesome/fontawesome-free/css/all.css';
import AuthenticationBackground from "../../assets/movies-authentication-background.jpg"

import "../../Styles/signup.css"

const NormalLoginForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="authentication-container">
      <img 
          src={AuthenticationBackground}
          alt="Movies Background"
          className="movies-authentication-background"
      />
      <div className="movies-authentication-background-overlay"/>
      {/* <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div> */}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
           <h3>LOG IN</h3>
        <div className="log">
     
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item  name="remember" valuePropName="checked" noStyle>
            <Checkbox className="remember-me-text">Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default NormalLoginForm;

