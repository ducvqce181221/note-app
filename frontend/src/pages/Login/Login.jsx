import Navbar from "../../components/Navbar/Navbar"
import { Form, Input, Row, Col, Divider, Button, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";

const Login = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values) => {
        setIsLoading(true);
        // console.log(">>> check value: ", values);

        await new Promise(resolve => {
            setTimeout(async () => {
                // Call Login API
                try {
                    const res = await axiosInstance.post('/login', {
                        email: values.email,
                        password: values.password
                    });
                    if (res.data && res.data.accessToken) {
                        message.success('Login successful');
                        localStorage.setItem("token", res.data.accessToken);
                        navigate('/dashboard');
                    }
                } catch (error) {
                    if (error.response && error.response.data && error.response.data.message) {
                        message.error(error.response.data.message);
                    } else {
                        alert("An unexpected error occurred. Please try again.");
                    }
                }

                resolve(null);
            }, 1000);
        });
        setIsLoading(false);
    };

    return (
        <>
            <Navbar />

            <Row justify={"center"}>
                <Col xs={24} md={16} lg={8}>
                    <fieldset style={{
                        marginTop: "70px",
                        padding: "25px",
                        border: "1px solid #ccc",
                        borderRadius: "5px"
                    }}>
                        <legend className="text-center text-lg font-medium">
                            Login
                        </legend>
                        <Form
                            name="login"
                            justify={'center'}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your Email!' }]}
                            >
                                <Input size="large" prefix={<UserOutlined />} placeholder="Username" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input.Password size="large" prefix={<LockOutlined />} placeholder="Password" />
                            </Form.Item>

                            <Button block type="primary" htmlType="submit"
                                className="mt-4" loading={isLoading}
                            >
                                Login
                            </Button>

                        </Form>

                        <Divider />
                        <div className="flex justify-center">
                            <span>Not registered yet? <Link to={'/sign-up'}>Create an Account here</Link></span>
                        </div>
                    </fieldset>
                </Col>
            </Row>
        </>
    )
}

export default Login