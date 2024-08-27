import React from 'react';
import { Typography, Card, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
      <div style={{ padding: '30px' }}>
        <Title level={2}>Chào mừng đến với Hệ thống Quản lý Đại học</Title>
        <Paragraph>
          Hệ thống này được thiết kế để giúp quản lý các khía cạnh khác nhau của hoạt động đại học, bao gồm sinh viên, khoa và các trường đại học. Dưới đây là phần giới thiệu ngắn gọn về các vai trò và quyền hạn có sẵn trong hệ thống.
        </Paragraph>

        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col span={8}>
            <Card title="Quản trị viên" bordered={false}>
              <Paragraph>
                Quản trị viên có quyền truy cập đầy đủ vào tất cả các tính năng của hệ thống. Điều này bao gồm quản lý người dùng, gán vai trò, và kiểm soát các cài đặt trên toàn hệ thống.
              </Paragraph>
              <Paragraph>
                <strong>Quyền hạn:</strong>
                <ul>
                  <li>Quản lý Người dùng</li>
                  <li>Gán Vai trò</li>
                  <li>Quản lý Trường đại học</li>
                  <li>Quản lý Khoa</li>
                  <li>Quản lý Sinh viên</li>
                </ul>
              </Paragraph>
            </Card>
          </Col>

          <Col span={8}>
            <Card title="Quản lý Trường đại học" bordered={false}>
              <Paragraph>
                Quản lý Trường đại học chịu trách nhiệm giám sát tất cả các hoạt động liên quan đến các trường đại học, bao gồm thêm và cập nhật thông tin trường đại học.
              </Paragraph>
              <Paragraph>
                <strong>Quyền hạn:</strong>
                <ul>
                  <li>Danh sách Trường đại học</li>
                  <li>Thêm/Cập nhật Thông tin Trường đại học</li>
                  <li>Xem Khoa</li>
                </ul>
              </Paragraph>
            </Card>
          </Col>

          <Col span={8}>
            <Card title="Quản lý Khoa" bordered={false}>
              <Paragraph>
                Quản lý Khoa xử lý các nhiệm vụ cụ thể liên quan đến khoa, bao gồm quản lý thông tin khoa và giám sát dữ liệu sinh viên liên quan.
              </Paragraph>
              <Paragraph>
                <strong>Quyền hạn:</strong>
                <ul>
                  <li>Danh sách Khoa</li>
                  <li>Quản lý Thông tin Khoa</li>
                  <li>Xem Sinh viên trong Khoa</li>
                </ul>
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col span={8}>
            <Card title="Sinh viên" bordered={false}>
              <Paragraph>
                Sinh viên có thể xem thông tin cá nhân của mình, các khóa học, và tiến độ học tập trong hệ thống.
              </Paragraph>
              <Paragraph>
                <strong>Quyền hạn:</strong>
                <ul>
                  <li>Xem Thông tin Cá nhân</li>
                  <li>Xem Các khóa học</li>
                  <li>Xem Tiến độ học tập</li>
                </ul>
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
  );
};

export default Home;
