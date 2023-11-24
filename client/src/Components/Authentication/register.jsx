
import React from "react";
import "../../Styles/authentication.css";
import "../../Styles/signup.css"
import { Form, Input, Button, Checkbox, Select } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "@fortawesome/fontawesome-free/css/all.css";



const { Option } = Select;
const NormalSignUpForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="authen-container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
   <div className="forms">
      <Form
        name="normal_signup"
        className="signup-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <h3>Sign Up</h3>
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
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
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
            />
          </Form.Item>
          <Form.Item
            name="role"
            rules={[
              {
                required: true,
                message: "Please choose a role",
              },
            ]}
          >
            <Select
              placeholder="Select a role"
              prefix={<UserOutlined className="site-form-item-icon" />}
            >
              <Option value="admin">Admin</Option>
              <Option value="member">User</Option>
       
            </Select>
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
            >
              Sign Up
            </Button>
          </Form.Item>
        </div>
      </Form>
      </div>
    </div>
  );
};
export default NormalSignUpForm;