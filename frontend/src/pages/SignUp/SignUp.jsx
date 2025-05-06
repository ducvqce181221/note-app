import Navbar from "../../components/Navbar/Navbar"
import { Form, Input, Row, Col, Divider, Button } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {

    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log(">>> check value: ", values)

        // Call SignUp API
        try {
            const res = await axiosInstance.post('/create-account', {
                fullName: values.username,
                email: values.email,
                password: values.password
            });
            if (res.data && res.data.accessToken) {
                localStorage.setItem("token", res.data.accessToken);
                navigate('/dashboard');
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
        }
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
                            SignUp
                        </legend>
                        <Form
                            name="login"
                            justify={'center'}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input size="large" prefix={<UserOutlined />} placeholder="Username" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your Email!' }]}
                            >
                                <Input size="large" prefix={<MailOutlined />} placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input.Password size="large" prefix={<LockOutlined />} placeholder="Password" />
                            </Form.Item>

                            <Button block type="primary" htmlType="submit"
                                className="mt-4"
                            >
                                SignUp
                            </Button>

                        </Form>

                        <Divider />
                        <div className="flex justify-center">
                            <span>Already have an account? <Link to={'/login'}>Login here</Link></span>
                        </div>
                    </fieldset>
                </Col>
            </Row>
        </>
    )
}

export default SignUp