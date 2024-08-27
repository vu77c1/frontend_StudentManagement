import React, { useState } from 'react';
import { Modal, Input, Form } from 'antd';

const UpdateProfileModal = ({ isModalOpen, handleOk, handleCancel, student }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Here you can make an API call to update the user's profile
    console.log('Form values:', values);
    // Example API call to update profile
    // updateStudentProfile(student.username, values)
    //   .then(() => {
    //     message.success('Profile updated successfully');
    //     handleOk(); // Close modal after success
    //   })
    //   .catch((error) => {
    //     message.error('Failed to update profile');
    //     console.error(error);
    //   });
    handleOk(); // For now, just close the modal
  };

  return (
      <Modal
          title="Update Profile"
          open={isModalOpen}
          onOk={form.submit} // Trigger form submission on OK click
          onCancel={handleCancel}
      >
        <Form
            form={form}
            layout="vertical"
            initialValues={{
              email: student?.email,
              phone: student?.phone,
              address: student?.address,
            }}
            onFinish={onFinish}
        >
          <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
              label="Address"
              name="address"
          >
            <Input placeholder="Enter your address" />
          </Form.Item>
        </Form>
      </Modal>
  );
};

export default UpdateProfileModal;
