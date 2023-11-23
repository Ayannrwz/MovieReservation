import React from "react";
import ReactDOM from "react-dom";
import "../../Styles/authentication.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import '@fortawesome/fontawesome-free/css/all.css';

const NormalLoginForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
           <h3>Log in Form</h3>
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
        <Form.Item>
          <Form.Item  name="remember" valuePropName="checked" noStyle>
            {/* <Checkbox ><p style={{color:"black"}}>Remember me</p></Checkbox> */}
            <Checkbox>Remember me</Checkbox>
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
    </>
  );
};

export default NormalLoginForm;
// ReactDOM.render(<NormalLoginForm />, document.getElementById('container'));
