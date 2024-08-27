import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  notification,
  Row
} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {loginAPI} from "../services/api.service.js";
import {AuthContext} from "../context/auth.context.jsx";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setUser} = useContext(AuthContext);

  useEffect(() => {
    // Kiểm tra token trong localStorage
    const token = localStorage.getItem("access_token");
    if (token) {
      // Nếu có token, chuyển hướng đến trang home
      navigate("/");
    }
  }, [navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    const res = await loginAPI(values.username, values.password);
    if (res.data) {
      console.log(res.data);
      message.success("Đăng nhập thành công");
      localStorage.setItem("access_token", res.data.accessToken);
      localStorage.setItem("user_roles",res.data.role);
      setUser(res.data); // Gán dữ liệu người dùng vào context
      navigate("/");
    } else {
      notification.error({
        message: "Error Login",
        description: JSON.stringify(res.message)
      });
    }
    setLoading(false);
  };

  return (
      <Row justify={"center"} style={{marginTop: "30px"}}>
        <Col xs={24} md={16} lg={8}>
          <fieldset style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px"
          }}>
            <legend>Đăng Nhập</legend>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
              <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Username không được để trống!',
                    }
                  ]}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Password không được để trống!',
                    }
                  ]}
              >
                <Input.Password onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    form.submit();
                  }
                }}/>
              </Form.Item>

              <Form.Item>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <Button type="primary"
                          loading={loading} onClick={() => form.submit()}>
                    Login
                  </Button>
                  <Link to="/">Go to homepage <ArrowRightOutlined/></Link>
                </div>
              </Form.Item>
            </Form>
            <Divider/>
            <div style={{textAlign: "center"}}>
              Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
  )
}

export default LoginPage;
