import {useEffect, useState} from 'react';
import {
  Form,
  Input,
  Button,
  notification,
  DatePicker,
  Row,
  Col,
  Radio,
  Breadcrumb, Select
} from 'antd';
import {
  SaveOutlined,
  RedoOutlined,
  CloseOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined, HomeOutlined
} from '@ant-design/icons';
import moment from 'moment';

import {useNavigate, useParams} from "react-router-dom";
import {
  findStudentById,
  updateStudent
} from "../../services/api.student.service.js";
import {getAllDepartment} from "../../services/api.department.service.js";
import {getAllUniversities} from "../../services/api.university.service.js";

const UpdateStudent = () => {
  const [form] = Form.useForm();
  const {studentId} = useParams();
  const [departments, setDepartments] = useState([]);
  const [universities, setUniversities] = useState([]);
  const navigate = useNavigate();
  const fetchDepartmentsAndUniversities = async () => {
    try {
      // Fetch departments
      const departmentResponse = await getAllDepartment();
      if (departmentResponse.status === 200) {
        setDepartments(departmentResponse.data);
      } else {
        notification.error({
          message: 'Error',
          description: 'Failed to load departments',
        });
      }

      // Fetch universities
      const universityResponse = await getAllUniversities();
      if (universityResponse.status === 200) {
        setUniversities(universityResponse.data);
      } else {
        notification.error({
          message: 'Error',
          description: 'Failed to load universities',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'An error occurred while fetching data',
      });
    }
  };
  const findStudent = async () => {
    try {
      const student = await findStudentById(studentId);
      if (student.data) {
        // Đặt giá trị cho các trường trong form bằng hàm setFieldsValue
        form.setFieldsValue({
          studentId: student.data.studentId,
          fullName: student.data.fullName,
          gender: student.data.gender,
          department: student.data.department.departmentId, // Cần map đúng tên trường
          university: student.data.university.universityId, // Cần map đúng tên trường
          // dateOfBirth: student.data.dateOfBirth ? (student.data.dateOfBirth, 'YYYY-MM-DD') : null, // Chuyển đổi ngày sinh thành đối tượng moment
          email: student.data.email,
          dateOfBirth: student.data.dateOfBirth ? moment(
              student.data.dateOfBirth, 'YYYY-MM-DD') : null, // Chuyển đổi ngày sinh thành đối tượng moment

          phone: student.data.phone,
          permanentAddress: student.data.permanentAddress,
          temporaryAddress: student.data.temporaryAddress,
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch student details',
      });
    }
  }
  useEffect(() => {
    findStudent(studentId)
    fetchDepartmentsAndUniversities();
  }, [studentId]);
  const handleSubmit = async (values) => {
    try {
      const studentData = {
        // academicYear: values.academicYear,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format(
            'YYYY-MM-DD') : null,
        email: values.email,
        fullName: values.fullName,
        gender: values.gender,
        permanentAddress: values.permanentAddress,
        phone: values.phone,
        temporaryAddress: values.temporaryAddress,
        universityId: values.university,
        departmentId: values.department,
      };
      const response = await updateStudent(studentId, studentData);
      if (response.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Student updated successfully',
        });
        navigate('/admin/students'); // Đường dẫn đến trang bạn muốn điều hướng
      } else {
        notification.error({
          message: 'Error',
          description: response.message,
        });
      }
    } catch (error) {
      console.log(error)
      notification.error({
        message: 'Error',
        description: 'Failed to update student',
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
      title: 'Student Management',
    },
    {
      title: 'Update Student',
    },
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
                  name="studentId"
                  label="Student ID"
                  rules={[{
                    required: true,
                    message: 'Please input the student ID!'
                  }]}
              >
                <Input prefix={<UserOutlined/>} disabled/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="fullName"
                  label="Full Name"
                  rules={[{
                    required: true,
                    message: 'Please input the full name!'
                  }]}
              >
                <Input prefix={<UserOutlined/>}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{
                    required: true,
                    message: 'Please select the gender!'
                  }]}
              >
                <Radio.Group>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                  name="department"
                  label="Department"
                  rules={[{
                    required: true,
                    message: 'Please choose the department!'
                  }]}
              >
                <Select placeholder="Choose majors">
                  {departments.map(department => (
                      // eslint-disable-next-line react/jsx-no-undef
                      <Option key={department.departmentId} value={department.departmentId}>
                        {department.departmentName}
                      </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="university"
                  label="University"
                  rules={[{
                    required: true,
                    message: 'Please choose the university!'
                  }]}
              >
                <Select placeholder="Choose school" prefix={<HomeOutlined />}>
                  {universities.map(university => (
                      // eslint-disable-next-line react/jsx-no-undef
                      <Option key={university.universityId} value={university.universityId}>
                        {university.universityName}
                      </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="dateOfBirth"
                  label="Date of Birth"
                  rules={[{
                    required: true,
                    message: 'Please select the date of birth!'
                  }]}
              >
                <DatePicker format="YYYY-MM-DD" prefix={<CalendarOutlined/>}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {type: 'email', message: 'The input is not valid E-mail!'},
                    {required: true, message: 'Please input your email!'}
                  ]}
              >
                <Input prefix={<MailOutlined/>}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[{
                    required: true,
                    message: 'Please input the phone number!'
                  }]}
              >
                <Input prefix={<PhoneOutlined/>}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              {/* Empty column for alignment */}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                  name="permanentAddress"
                  label="Permanent Address"
                  rules={[{
                    required: true,
                    message: 'Please input the permanent address!'
                  }]}
              >
                <Input.TextArea rows={4} placeholder="Enter permanent address"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                  name="temporaryAddress"
                  label="Temporary Address"
                  rules={[{
                    required: true,
                    message: 'Please input the temporary address!'
                  }]}
              >
                <Input.TextArea rows={4} placeholder="Enter temporary address"/>
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

export default UpdateStudent;
