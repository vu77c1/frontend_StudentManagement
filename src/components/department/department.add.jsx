import React, {useEffect, useState} from 'react';
import {
  Form,
  Input,
  Button,
  notification,
  Row,
  Col,
  Breadcrumb,
} from 'antd';
import {
  SaveOutlined,
  RedoOutlined,
  CloseOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import {
  addDepartment,
} from "../../services/api.department.service.js";
import {useNavigate} from "react-router-dom";

const AddDepartment = () => {
  const [form] = Form.useForm();
  const navigate =  useNavigate();
  useEffect(() => {
  }, []);

  const handleSubmit = async (values) => {
    try {
      const departmentDto = {
        departmentId: values.departmentId,
        departmentName: values.departmentName,
        description: values.description,
      }
      console.log(departmentDto);

      //insert the department to database
      const res = await addDepartment(departmentDto);
      if (res.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Department added successfully',
        });
      } else {
        notification.error({
          message: 'Error',
          description: res.message,
        });
      }
      //reset the form
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
    navigate('/admin/department')
    form.resetFields();
  };
  const breadcrumbItems = [
    {
      title: 'Department Management',
    },
    {
      title: 'Add Department',
    }
  ];
  return (
      <>
        <Breadcrumb
            style={{marginBottom: '15px', fontSize: '20px', paddingLeft: 30}}
            items={breadcrumbItems}  // Sử dụng thuộc tính items để cung cấp các mục breadcrumb
        /> <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{paddingLeft: 30, paddingRight: 30, margin: '0 auto'}}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
                name="departmentId"
                label="Department ID"
                rules={[{
                  required: true,
                  message: 'Please input the department ID!'
                }]}
            >
              <Input prefix={<HomeOutlined/>}/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
                name="departmentName"
                label="Department Name"
                rules={[{
                  required: true,
                  message: 'Please input the department name!'
                }]}
            >
              <Input prefix={<HomeOutlined/>}/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
                name="description"
                label="Description"
                rules={[{
                  required: true,
                  message: 'Please input the description !'
                }]}
            >
              <Input.TextArea prefix={<HomeOutlined/>} rows={4} placeholder="Enter description" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} style={{textAlign: 'right'}}>
            <Form.Item style={{display: 'inline-block', marginRight: '8px'}}>
              <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined/>}
                  style={{backgroundColor: 'green', borderColor: 'green'}}
              >
                Save
              </Button>
            </Form.Item>
            <Form.Item style={{display: 'inline-block', marginRight: '8px'}}>
              <Button
                  type="default"
                  onClick={handleReset}
                  icon={<RedoOutlined/>}
                  style={{backgroundColor: 'skyblue', borderColor: 'skyblue'}}
              >
                Reset
              </Button>
            </Form.Item>
            <Form.Item style={{display: 'inline-block'}}>
              <Button
                  type="default"
                  onClick={handleCancel}
                  icon={<CloseOutlined/>}
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

export default AddDepartment;
