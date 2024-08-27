import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Card,
  Row,
  Col,
  Avatar,
  Typography,
  Divider,
  Button,
  Spin,
  message, Modal, Form, Input
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  EditOutlined
} from '@ant-design/icons';
import {AuthContext} from "../../context/auth.context.jsx";
import {
  updateProfile,
  uploadImage,
  viewStudentImage,
  viewStudentProfile
} from "../../services/api.student.service.js";
import UpdateProfile from "./update.profile.model.jsx";

const {Title, Text} = Typography;

const StudentProfile = () => {
  const {user} = useContext(AuthContext);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImageUrl, setProfileImageUrl] = useState(
      "https://via.placeholder.com/128"); // Default image
  const fileInputRef = useRef(null);
  const [form] = Form.useForm(); // Create a form instance

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (values) => {
    console.log(values)
    apiUpdateProfile(values);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function handleImageClick() {
    fileInputRef.current.click();

  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      try {
        // Upload image
        uploadImage(user.username, file).then(() => {
          // Create a URL for the uploaded file and update the profile image
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfileImageUrl(reader.result); // Update the profile image URL to the uploaded image
            message.success('Image uploaded and updated successfully!');
          };
          reader.readAsDataURL(file);
        }).catch(error => {
          console.error("Error uploading image:", error);
          message.error('Error uploading image. Please try again.');
        });
      } catch (error) {
        console.error("Unexpected error uploading image:", error);
        message.error('Unexpected error occurred. Please try again.');
      }
    }
  }

  const apiUpdateProfile = (values) => {
    updateProfile(user.username, values)
    .then(() => {
      message.success('Profile updated successfully');
       getProfile(); // Refetch the profile data

    })
    .catch((error) => {
      message.error('Failed to update profile');
      console.error(error);
    });
  }

  const getProfile = async () => {
    if (user) {
      try {
        const res = await viewStudentProfile(user.username);
        if (res.data) {
          setStudent(res.data);
          // Fetch and set the student's profile image URL
          const imgUrl = res.data.profilePicture ? await viewStudentImage(
              res.data.profilePicture) : "https://via.placeholder.com/128";
          console.log("Profile image URL:", imgUrl);
          setProfileImageUrl(imgUrl);
        } else {
          console.error("No data found");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, [user]);

  const handleEditClick = () => {
    setIsModalOpen(true);

  };

  if (loading) {
    return <Spin size="large" style={{
      display: 'block',
      textAlign: 'center',
      marginTop: '20px'
    }}/>;
  }

  return (
      <div style={{padding: '20px'}}>
        <Title level={2} style={{textAlign: 'center'}}>Student Profile</Title>

        <Card
            style={{maxWidth: '800px', margin: 'auto'}}
            cover={
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '20px'
              }}>
                <Avatar
                    size={128}
                    src={profileImageUrl} // Use the profile image URL or fallback image
                    icon={<UserOutlined/>}
                    style={{cursor: 'pointer'}} // Add cursor pointer to indicate it's clickable
                    onClick={handleImageClick}
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                    accept="image/*"
                />
              </div>
            }
            actions={[
              <Button
                  type="primary"
                  icon={<EditOutlined/>}
                  onClick={handleEditClick}
              >
                Edit Profile
              </Button>
            ]}
        >
          <Title level={3} style={{textAlign: 'center'}}>{student?.fullName
              || "N/A"}</Title>
          <Text type="secondary"
                style={{display: 'block', textAlign: 'center'}}>
            {student?.studentId || "N/A"}
          </Text>

          <Divider/>

          <Row gutter={16}>
            <Col span={12}>
              <Text strong><HomeOutlined/> Department: </Text>
              <Text>{student?.department || "N/A"}</Text>
            </Col>
            <Col span={12}>
              <Text strong><MailOutlined/> Email: </Text>
              <Text>{student?.email || "N/A"}</Text>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Text strong><PhoneOutlined/> Phone: </Text>
              <Text>{student?.phone || "N/A"}</Text>
            </Col>
            <Col span={12}>
              <Text strong><HomeOutlined/> Address: </Text>
              <Text>{student?.address || "N/A"}</Text>
            </Col>
          </Row>
        </Card>

        <Modal
            title="Update Profile"
            open={isModalOpen}
            onOk={() => form.submit()} // Trigger form submission on OK click
            onCancel={handleCancel}
        >
          <Form
              form={form}
              layout="vertical"
              initialValues={{
                email: student?.email,
                phoneNumber: student?.phone,
                address: student?.address,
              }}
              onFinish={handleOk}
          >
            <Form.Item
                label="Email"
                name="email"
                rules={[{required: true, message: 'Please enter your email'}]}
            >
              <Input placeholder="Enter your email"/>
            </Form.Item>

            <Form.Item
                label="Phone"
                name="phoneNumber"
                rules={[{
                  required: true,
                  message: 'Please enter your phone number'
                }]}
            >
              <Input placeholder="Enter your phone number"/>
            </Form.Item>

            <Form.Item
                label="Address"
                name="address"
            >
              <Input placeholder="Enter your address"/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
  );

};

export default StudentProfile;
