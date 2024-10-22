import { Button, Form, Input, notification, Row, Col, Divider, Typography } from "antd";
const { Title } = Typography;
import { registerUser } from "../services/api.service";
import { isVietnamesePhoneNumber } from "../helpers/common.help";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);

    const res = await registerUser(
      values.fullName,
      values.email,
      values.password,
      values.phone
    );
    if (res.data) {
      notification.success({
        message: "Register user",
        description: "Register user succeed",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Error Register user",
        description: JSON.stringify(res.message),
      });
    }
  };
  return (
    <>
      <Form
        name="basic"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ margin: "30px" }}
        // onFinishFailed={onFinishFailed}
        // autoComplete="off"
      >
        <Title level={3} style={{ textAlign: "center" }}>Đăng ký tài khoản</Title>
        <Row justify={"center"}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your full name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row justify={"center"}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row justify={"center"}>
          <Col xs={24} md={8}>
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
          </Col>
        </Row>

        <Row justify={"center"}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Phone number"
              name="phone"
              rules={[
                {
                  required: true,
                  pattern: isVietnamesePhoneNumber(),
                  message: "Wrong format!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row justify={"center"}>
          <Col xs={24} md={8}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col xs={24} md={8}>
            <Divider />
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col xs={24} md={8}>
            Đã có tài khoản? <Link to={"/login"}>Đăng nhập tại đây</Link>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default RegisterPage;
