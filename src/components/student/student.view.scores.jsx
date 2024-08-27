import React, {useState} from 'react';
import {Form, Input, Button, Table, message, Row, Col, Card} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {getViewStudentScore} from "../../services/api.student.score.service.js";
import './StudentViewScores.css'; // Import the CSS file for custom styles

const StudentViewScores = () => {
  const [form] = Form.useForm();
  const [studentData, setStudentData] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);

  const onFinish = async (values) => {
    try {
      const res = await getViewStudentScore(values.studentId);
      if (res.status === 200) {
        setStudentData(res.data.studentScores);
        setStudentInfo({
          studentId: res.data.studentId,
          fullName: res.data.fullName,
          department: res.data.department,
          academicYear: res.data.academicYear,
          totalCredits: res.data.totalCredits,
          gpa: res.data.gpa
        });
        message.success('Dữ liệu đã được lấy thành công');
      } else {
        message.error('Không tìm thấy thông tin sinh viên');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Đã xảy ra lỗi khi lấy dữ liệu');
    }
  };

  const columns = [
    {
      title: 'Môn Học',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Số Tín Chỉ',
      dataIndex: 'credits',
      key: 'credits',
    },
    {
      title: 'Lý Thuyết (30%)',
      dataIndex: 'theoryScore',
      key: 'theoryScore',
    },
    {
      title: 'Thực Hành (70%)',
      dataIndex: 'practicalScore',
      key: 'practicalScore',
    },
    {
      title: 'Điểm TB Hệ 10',
      dataIndex: 'weightedAverage',
      key: 'weightedAverage',
    },
    {
      title: 'Điểm Chữ',
      dataIndex: 'letterGrade',
      key: 'letterGrade',
    },
    {
      title: 'Điểm Hệ 4',
      dataIndex: 'grade4',
      key: 'grade4',
    },
  ];

  // Function to determine the row class name based on the letter grade
  const rowClassName = (record) => {
    return record.letterGrade === 'F' ? 'row-red' : '';
  };

  return (
      <div style={{padding: '20px'}}>
        <h1 style={{paddingBottom: '10px'}}>Xem Điểm Sinh Viên</h1>

        <Form
            form={form}
            layout="inline"
            onFinish={onFinish}
            style={{marginBottom: '20px', textAlign: "center"}}
        >
          <Form.Item
              name="studentId"
              label="Mã Sinh Viên"
              rules={[{required: true, message: 'Vui lòng nhập mã sinh viên!'}]}
              style={{display: 'inline-block'}}
          >
            <Input placeholder="Nhập mã sinh viên" style={{width: '200px'}}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined/>}
                    style={{marginLeft: '10px'}}>
              Tìm
            </Button>
          </Form.Item>
        </Form>

        {studentInfo && (
            <Card title="Thông Tin Sinh Viên" style={{marginBottom: '20px'}}>
              <Row gutter={16}>
                <Col span={6}><strong>Mã Sinh
                  Viên:</strong> {studentInfo.studentId}</Col>
                <Col span={6}><strong>Họ Tên:</strong> {studentInfo.fullName}
                </Col>
                <Col span={6}><strong>Khoa:</strong> {studentInfo.department}
                </Col>
                <Col span={6}><strong>Niên
                  Khóa:</strong> {studentInfo.academicYear}</Col>
              </Row>
            </Card>
        )}

        {studentData && (
            <>
              <Table
                  dataSource={studentData}
                  columns={columns}
                  pagination={false}
                  rowKey={(record) => `${record.subject}-${record.credits}-${record.theoryScore}-${record.practicalScore}`}
                  rowClassName={rowClassName} // Apply row class name based on letter grade
              />
              <Card style={{marginTop: '20px'}}>
                <Row gutter={16}>
                  <Col span={12}>
                    <strong>Số Tín Chỉ Tích Lũy:</strong> {studentInfo
                      && studentInfo.totalCredits}
                  </Col>
                  <Col span={12}>
                    <strong>GPA:</strong> {studentInfo
                      && studentInfo.gpa.toFixed(2)}
                  </Col>
                </Row>
              </Card>
            </>
        )}
      </div>
  );
};

export default StudentViewScores;
