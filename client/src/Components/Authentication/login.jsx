import React from "react";
// import "../../Styles/authentication.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import '@fortawesome/fontawesome-free/css/all.css';

import AuthenticationBackground from "../../assets/movies-authentication-background.jpg"

import "../../Styles/signup.css"

const NormalLoginForm = () => {
    const [error, setError] = React.useState("");
    const onFinish = async (values) => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );

            if (response.ok) {
                console.log("Login successful");
                window.location.href = "/main";
            } else {
                console.error("Login failed");
                setError("Invalid username and password");
            }
        } catch (error) {
            // Handle network or other errors
            console.error("Error:", error);

            // Example: Display a generic error message
            //  setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="authentication-container">
          <img
            src={AuthenticationBackground}
            alt="Movies Background"
            className="movies-authentication-background"
          />
          <div className="movies-authentication-background-overlay"/>
            {/* <div class="background">
                <div class="shape"></div>
                <div class="shape"></div>
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
              {error && <div className="error-message">{error}</div>}
          <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username",
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