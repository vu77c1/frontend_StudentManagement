import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  notification,
  Row,
  Col,
  Breadcrumb,
  DatePicker
} from 'antd';
import {
  SaveOutlined,
  RedoOutlined,
  CloseOutlined,
  HomeOutlined,
  CalendarOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import {
  findUniversityById,
  updateUniversity
} from "../../services/api.university.service.js"; // Updated import
import moment from 'moment';
import { useParams } from "react-router-dom";

const UpdateUniversity = () => {
  const [form] = Form.useForm();
  const { universityId } = useParams();
  const [university, setUniversity] = useState(null);

  // Fetch university data by ID
  const getUniversityById = async () => {
    try {
      const response = await findUniversityById(universityId);
      if (response.status === 200) {
        const universityData = response.data;
        setUniversity(universityData);
        form.setFieldsValue({
          ...universityData,
          foundedYear: universityData.foundedYear ? moment(universityData.foundedYear, 'YYYY-MM-DD') : null,
        });
      } else {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch university data',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch university data',
      });
    }
  };

  useEffect(() => {
    getUniversityById();
  }, [universityId]);

  const handleSubmit = async (values) => {
    try {
      const foundedYear = values.foundedYear ? values.foundedYear.format('YYYY-MM-DD') : null;

      const universityData = {
        universityId: values.universityId,
        universityName: values.universityName,
        foundedYear: foundedYear,
        address: values.address,
        phone: values.phone,
        vision: values.vision,
        mission: values.mission,
        introduction: values.introduction
      };

      const universityResponse = await updateUniversity(universityId, universityData);
      if (universityResponse.status === 200) {
        notification.success({
          message: 'Success',
          description: 'University updated successfully',
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
        description: 'Failed to update university',
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
      title: 'Update University',
    },
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
                  name="universityId"
                  label="University ID"
              >
                <Input prefix={<HomeOutlined />} disabled />
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
            <Col span={16}>
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

export default UpdateUniversity;
