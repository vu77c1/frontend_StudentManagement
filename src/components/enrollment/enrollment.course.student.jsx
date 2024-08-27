import React, {useEffect, useState} from 'react';
import {Table, Spin, Alert, Input, Form, Typography, Modal, Button, notification} from 'antd'; // Import notification
import {
  getEnrollmentByTeacherId
} from "../../services/api.enrollment.service.js";
import {insertStudentScore} from "../../services/api.student.score.service.js";

const {Search} = Input;
const {Title} = Typography;

const EnrollmentCourseStudent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const getEnrollment = async (id) => {
    try {
      const res = await getEnrollmentByTeacherId(id);
      setData(res.data);
      setFilteredData(res.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  }

  useEffect(() => {
    getEnrollment("GV003");
  }, []);

  const handleSearch = (value) => {
    setSearchValue(value);
    const lowercasedValue = value.toLowerCase();
    const filtered = data.filter(item =>
        item.studentId.toLowerCase().includes(lowercasedValue) ||
        item.courseName.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    form.setFieldsValue({
      scoreTheory: '', // Reset input fields
      scorePractical: ''
    });
    console.log("check student", student)
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedStudent(null);
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      const request = {
        enrollmentId: selectedStudent.enrollmentId,
        scoreTheory: values.scoreTheory,
        scorePractical: values.scorePractical
      };

      insertStudentScore(request)
      .then(response => {
        notification.success({
          message: 'Success',
          description: 'Scores saved successfully!',
        });
        handleModalClose(); // Close the modal after successful save
        getEnrollment("GV003"); // Reload the table data after saving
      })
      .catch(error => {
        notification.error({
          message: 'Error',
          description: 'Failed to save scores. Please try again.',
        });
      });
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const columns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
    },
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
      render: (text, record) => (
          <Button type="link" onClick={() => handleStudentClick(record)}>
            {text}
          </Button>
      ),
    },
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Course ID',
      dataIndex: 'courseId',
      key: 'courseId',
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
    },
  ];

  return (
      <div style={{padding: '20px'}}>
        {loading ? (
            <Spin tip="Loading..."/>
        ) : error ? (
            <Alert message={error} type="error"/>
        ) : (
            <>
              <Title level={4}>Search Enrollments</Title>
              <Form layout="inline" style={{marginBottom: 16}}>
                <Form.Item label="Search by Student ID or Course Name">
                  <Search
                      placeholder="Enter student ID or course name"
                      onSearch={handleSearch}
                      enterButton
                      allowClear
                      value={searchValue}
                      onChange={e => handleSearch(e.target.value)}
                      style={{width: 300}}
                  />
                </Form.Item>
              </Form>
              <Table dataSource={filteredData} columns={columns}
                     rowKey="enrollmentId"/>
              {selectedStudent && (
                  <Modal
                      title={`Enter Scores for ${selectedStudent.studentId}`}
                      visible={modalVisible}
                      onCancel={handleModalClose}
                      footer={[
                        <Button key="cancel" onClick={handleModalClose}>
                          Cancel
                        </Button>,
                        <Button key="save" type="primary" onClick={handleSave}>
                          Save
                        </Button>,
                      ]}
                  >
                    <Form form={form} layout="vertical">
                      <Form.Item
                          label="Score Theory"
                          name="scoreTheory"
                          rules={[{
                            required: true,
                            message: 'Please input the theory score!'
                          }]}
                      >
                        <Input type="number" step="0.01"
                               placeholder="Enter theory score"/>
                      </Form.Item>
                      <Form.Item
                          label="Score Practical"
                          name="scorePractical"
                          rules={[{
                            required: true,
                            message: 'Please input the practical score!'
                          }]}
                      >
                        <Input type="number" step="0.01"
                               placeholder="Enter practical score"/>
                      </Form.Item>
                    </Form>
                  </Modal>
              )}
            </>
        )}
      </div>
  );
};

export default EnrollmentCourseStudent;
