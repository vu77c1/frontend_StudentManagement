import React from 'react';
import {
  Form,
  Input,
  Button,
  notification,
  Row,
  Col,
  Breadcrumb, Select,
} from 'antd';
import {
  CheckCircleOutlined, // Biểu tượng Save
  ReloadOutlined,     // Biểu tượng Reset
  CloseCircleOutlined, // Biểu tượng Cancel
  HomeOutlined,       // Biểu tượng ô nhập liệu
  UserOutlined,       // Biểu tượng ô nhập liệu
  IdcardOutlined,     // Biểu tượng ô nhập liệu
} from '@ant-design/icons';
import {
  addCourse,
} from "../../services/api.course.service.js";
import { useNavigate } from "react-router-dom";
import {getAllDepartment} from "../../services/api.department.service.js";

const AddCourse = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [departments, setDepartments] = React.useState([]);
  React.useEffect(() => {
    loadDepartment();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const courseDto = {
        courseId: values.courseId,
        name: values.courseName,
        credits: values.credits,
        departmentId: values.departmentId,
      };
      console.log(courseDto);

      // Insert the course to database
      const res = await addCourse(courseDto);
      if (res.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Course added successfully',
        });
      } else {
        notification.error({
          message: 'Error',
          description: res.message,
        });
      }
      // Reset the form
      form.resetFields();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add course',
      });
    }
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleCancel = () => {
    navigate('/admin/course');
    form.resetFields();
  };
  const loadDepartment = async () => {
    try {
      const res = await getAllDepartment();
      console.log(res.data);
      setDepartments(res.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to load departments',
      });
    }
  };

  const breadcrumbItems = [
    {
      title: 'Course Management',
    },
    {
      title: 'Add Course',
    }
  ];

  return (
      <>
        <Breadcrumb
            style={{ marginBottom: '15px', fontSize: '20px', paddingLeft: 30 }}
            items={breadcrumbItems}
        />
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{ paddingLeft: 30, paddingRight: 30, margin: '0 auto' }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                  name="courseId"
                  label="Course ID"
                  rules={[{
                    required: true,
                    message: 'Please input the course ID!'
                  }]}
              >
                <Input prefix={<IdcardOutlined />} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="courseName"
                  label="Course Name"
                  rules={[{
                    required: true,
                    message: 'Please input the course name!'
                  }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="credits"
                  label="Credits"
                  rules={[{
                    required: true,
                    message: 'Please input the number of credits!'
                  }]}
              >
                <Input type="number" prefix={<HomeOutlined />} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="departmentId"
                  label="Department ID"
                  rules={[{
                    required: true,
                    message: 'Please select the department!'
                  }]}
              >
                <Select
                    placeholder="Select a department"
                    prefix={<HomeOutlined />}
                >
                  {departments.map(department => (
                      // eslint-disable-next-line react/jsx-no-undef
                      <Option key={department.departmentId} value={department.departmentId}>
                        {department.departmentName}
                      </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Form.Item style={{ display: 'inline-block', marginRight: '8px' }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    icon={<CheckCircleOutlined />} // Biểu tượng Save
                    style={{ backgroundColor: 'green', borderColor: 'green' }}
                >
                  Save
                </Button>
              </Form.Item>
              <Form.Item style={{ display: 'inline-block', marginRight: '8px' }}>
                <Button
                    type="default"
                    onClick={handleReset}
                    icon={<ReloadOutlined />} // Biểu tượng Reset
                    style={{ backgroundColor: 'skyblue', borderColor: 'skyblue' }}
                >
                  Reset
                </Button>
              </Form.Item>
              <Form.Item style={{ display: 'inline-block' }}>
                <Button
                    type="default"
                    onClick={handleCancel}
                    icon={<CloseCircleOutlined />} // Biểu tượng Cancel
                    style={{ backgroundColor: 'orange', borderColor: 'orange' }}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </>
  );
};

export default AddCourse;
