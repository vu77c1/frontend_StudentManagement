import React, {useEffect, useState} from 'react';
import {
  Form,
  Input,
  Button,
  notification,
  Row,
  Col,
  Breadcrumb,
  Select,
} from 'antd';
import {
  CheckCircleOutlined, // Save icon
  ReloadOutlined,     // Reset icon
  CloseCircleOutlined, // Cancel icon
  HomeOutlined,       // Input icon
  UserOutlined,       // Input icon
  IdcardOutlined,     // Input icon
} from '@ant-design/icons';
import {
  updateCourse,
  getCourseById
} from "../../services/api.course.service.js";
import {useNavigate, useParams} from "react-router-dom";
import {getAllDepartment} from "../../services/api.department.service.js";

const {Option} = Select;

const UpdateCourse = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {courseId} = useParams();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    loadDepartment();
    loadCourse();
  }, [courseId]);

  const loadDepartment = async () => {
    try {
      const res = await getAllDepartment();
      if (res.status === 200) {
        setDepartments(res.data);
      } else {
        notification.error({
          message: 'Error',
          description: res.message || 'Failed to load departments',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to load departments',
      });
    }
  };

  const loadCourse = async () => {
    try {
      const res = await getCourseById(courseId);
      if (res.status === 200) {
        form.setFieldsValue({
          courseId: res.data.courseId,
          courseName: res.data.name,
          credits: res.data.credits,
          departmentId: res.data.department.departmentId,
        });
      } else {
        notification.error({
          message: 'Error',
          description: res.message || 'Failed to load course data',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to load course data',
      });
    }
  };

  const handleSubmit = async (values) => {
    try {
      const courseDto = {
        courseId: values.courseId,
        name: values.courseName,
        credits: values.credits,
        departmentId: values.departmentId,
      };

      const res = await updateCourse(courseId, courseDto);
      if (res.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Course updated successfully',
        });
        navigate('/admin/course');
      } else {
        notification.error({
          message: 'Error',
          description: res.message || 'Failed to update course',
        });
      }
      form.resetFields();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update course',
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

  const breadcrumbItems = [
    {title: 'Course Management'},
    {title: 'Update Course'},
  ];

  return (
      <>
        <Breadcrumb
            style={{marginBottom: '15px', fontSize: '20px', paddingLeft: 30}}
            items={breadcrumbItems}
        />
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{paddingLeft: 30, paddingRight: 30, margin: '0 auto'}}
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
                <Input prefix={<IdcardOutlined/>} disabled/>
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
                <Input prefix={<UserOutlined/>}/>
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
                <Input type="number" prefix={<HomeOutlined/>}/>
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
                    prefix={<HomeOutlined/>}
                >
                  {departments.map(department => (
                      <Option key={department.departmentId}
                              value={department.departmentId}>
                        {department.departmentName}
                      </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} style={{textAlign: 'right'}}>
              <Form.Item style={{display: 'inline-block', marginRight: '8px'}}>
                <Button
                    type="primary"
                    htmlType="submit"
                    icon={<CheckCircleOutlined/>} // Save icon
                    style={{backgroundColor: 'green', borderColor: 'green'}}
                >
                  Save
                </Button>
              </Form.Item>
              <Form.Item style={{display: 'inline-block', marginRight: '8px'}}>
                <Button
                    type="default"
                    onClick={handleReset}
                    icon={<ReloadOutlined/>} // Reset icon
                    style={{backgroundColor: 'skyblue', borderColor: 'skyblue'}}
                >
                  Reset
                </Button>
              </Form.Item>
              <Form.Item style={{display: 'inline-block'}}>
                <Button
                    type="default"
                    onClick={handleCancel}
                    icon={<CloseCircleOutlined/>} // Cancel icon
                    style={{backgroundColor: 'orange', borderColor: 'orange'}}
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

export default UpdateCourse;
