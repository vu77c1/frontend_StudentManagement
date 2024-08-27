import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  notification,
  Row,
  Col,
  Breadcrumb,
  DatePicker,
  Select
} from 'antd';
import {
  SaveOutlined,
  RedoOutlined,
  CloseOutlined,
  HomeOutlined,
  CalendarOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { addUniversity } from "../../services/api.university.service.js";
import { getAllDepartment } from "../../services/api.department.service.js";

const { Option } = Select;

const AddUniversity = () => {
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);

  const loadDepartments = async () => {
    const res = await getAllDepartment();
    setDepartments(res.data);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const handleSubmit = async (values) => {
    try {
      // Convert DatePicker value to 'YYYY-MM-DD'
      const foundedYear = values.foundedYear ? values.foundedYear.format('YYYY-MM-DD') : null;

      // Map form values to DTO structure
      const universityData = {
        universityId: values.universityId,
        universityName: values.universityName,
        foundedYear: foundedYear,
        address: values.address,
        phone: values.phone,
        departmentIds: values.departments,
        vision: values.vision,
        mission: values.mission,
        introduction: values.introduction
      };
      console.log(universityData);

      const universityResponse = await addUniversity(universityData); // Change to addUniversity
      if (universityResponse.status === 200) {
        notification.success({
          message: 'Success',
          description: 'University added successfully',
        });
      } else {
        notification.error({
          message: 'Error',
          description: universityResponse.message,
        });
      }

      form.resetFields();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add university',
      });
    }
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleCancel = () => {
    notification.info({
      message: 'Cancelled',
      description: 'Form has been reset.',
    });
    form.resetFields();
  };
  const breadcrumbItems = [
    {
      title: 'University Management',
    },
    {
      title: 'Add University',
    }
  ];
  return (
      <>
        <Breadcrumb
            style={{ marginBottom: '15px', fontSize: '20px', paddingLeft: 30 }}
            items={breadcrumbItems}  // Sử dụng thuộc tính items để cung cấp các mục breadcrumb
        />        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{ paddingLeft: 30, paddingRight: 30, margin: '0 auto' }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                  name="universityId"
                  label="University ID"
                  rules={[{ required: true, message: 'Please input the university ID!' }]}
              >
                <Input prefix={<HomeOutlined />} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="universityName"
                  label="University Name"
                  rules={[{ required: true, message: 'Please input the university name!' }]}
              >
                <Input prefix={<HomeOutlined />} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="foundedYear"
                  label="Founded Year"
                  rules={[{ required: true, message: 'Please select the founded year!' }]}
              >
                <DatePicker
                    picker="date"
                    format="YYYY-MM-DD"
                    prefix={<CalendarOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[{ required: true, message: 'Please input the phone number!' }]}
              >
                <Input prefix={<PhoneOutlined />} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="departments"
                  label="Departments"
                  rules={[{ required: true, message: 'Please select at least one department!' }]}
              >
                <Select
                    mode="multiple"
                    placeholder="Select departments"
                    allowClear
                >
                  {departments.map(department => (
                      <Option key={department.departmentId} value={department.departmentId}>
                        {department.departmentName}
                      </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: 'Please input the address!' }]}
              >
                <Input.TextArea rows={4} placeholder="Enter address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                  name="vision"
                  label="Vision"
                  rules={[{ required: true, message: 'Please input the vision!' }]}
              >
                <Input.TextArea rows={4} placeholder="Enter vision" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="mission"
                  label="Mission"
                  rules={[{ required: true, message: 'Please input the mission!' }]}
              >
                <Input.TextArea rows={4} placeholder="Enter mission" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="introduction"
                  label="Introduction"
                  rules={[{ required: true, message: 'Please input the introduction!' }]}
              >
                <Input.TextArea rows={4} placeholder="Enter introduction" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Form.Item style={{ display: 'inline-block', marginRight: '8px' }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    style={{ backgroundColor: 'green', borderColor: 'green' }}
                >
                  Save
                </Button>
              </Form.Item>
              <Form.Item style={{ display: 'inline-block', marginRight: '8px' }}>
                <Button
                    type="default"
                    onClick={handleReset}
                    icon={<RedoOutlined />}
                    style={{ backgroundColor: 'skyblue', borderColor: 'skyblue' }}
                >
                  Reset
                </Button>
              </Form.Item>
              <Form.Item style={{ display: 'inline-block' }}>
                <Button
                    type="default"
                    onClick={handleCancel}
                    icon={<CloseOutlined />}
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

export default AddUniversity;
