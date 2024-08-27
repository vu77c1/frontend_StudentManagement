import React, {useEffect, useState} from 'react';
import {
  notification,
  Popconfirm,
  Space,
  Table,
  Input,
  Button,
  Breadcrumb
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  FileExcelOutlined
} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {
  deleteStudent, getAllStudentsPaging
} from "../../services/api.student.service.js";

const StudentTable = () => {
  // Khởi tạo state lưu trữ danh sách sinh viên và thông tin phân trang
  const [students, setStudents] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const [searchText, setSearchText] = useState(''); // Từ khóa tìm kiếm

  // Hàm tải danh sách sinh viên theo trang, số lượng trên mỗi trang và từ khóa tìm kiếm
  const loadStudents = async (current, pageSize, search) => {
    try {
      const res = await getAllStudentsPaging(current - 1, pageSize, search);
      console.log(res.data)
      if (res.data) {
        setStudents(res.data.items);
        setCurrent(current); // Trang hiện tại (1-based)
        setPageSize(pageSize);
        setTotalPages(res.data.totalPages); // Tổng số trang
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  // Hàm xử lý khi thay đổi trang hoặc kích thước trang
  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;

    if (current) {
      setCurrent(current); // Cập nhật trang hiện tại
    }

    if (pageSize) {
      setPageSize(pageSize); // Cập nhật kích thước trang
    }
    loadStudents(current, pageSize,searchText);

  };

  // Sử dụng useEffect để tự động tải danh sách sinh viên khi component được render hoặc khi các giá trị trong dependency array thay đổi
  useEffect(() => {
    loadStudents(current, pageSize, searchText);
  }, [current, pageSize, searchText]);

  // Hàm xóa sinh viên theo ID
  const handleDeleteStudent = async (id) => {
    const res = await deleteStudent(id);
    if (res.data) {
      notification.success({
        message: "Delete Student",
        description: "Xóa sinh viên thành công"
      });
      loadStudents(current, pageSize, searchText);
    } else {
      notification.error({
        message: "Error delete user",
        description: JSON.stringify(res.message)
      });
    }
  };

  // Hàm xử lý khi nhấn vào nút Import Excel
  const handleImportExcel = () => {
    notification.info({
      message: "Import Excel",
      description: "Import Excel chưa được triển khai"
    });
  };

  // Hàm xử lý khi nhấn vào nút Export Excel
  const handleExportExcel = () => {
    notification.info({
      message: "Export Excel",
      description: "Export Excel chưa được triển khai"
    });
  };

  // Định nghĩa các cột của bảng sinh viên
  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Department',
      dataIndex: ['department', 'departmentName'],
      key: 'department',
    },
    {
      title: 'University',
      dataIndex: ['university', 'universityName'],
      key: 'university',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
          <div style={{display: "flex", gap: "20px"}}>
            <Link to={`/admin/students/edit/${record.studentId}`}>
              <EditOutlined style={{cursor: 'pointer', color: 'orange'}}/>
            </Link>
            <Popconfirm
                title="Xóa sinh viên"
                description="Bạn chắc chắn xóa sinh viên này?"
                onConfirm={() => handleDeleteStudent(record.studentId)}
                okText="Yes"
                cancelText="No"
                placement="left"
            >
              <DeleteOutlined style={{cursor: "pointer", color: "red"}}/>
            </Popconfirm>
          </div>
      ),
    },
  ];

  // Khởi tạo breadcrumbs để điều hướng
  const breadcrumbItems = [
    {
      title: 'Student Management',
    },
    {
      title: 'List Student',
    },
  ];

  return (
      <>
        {/* Hiển thị breadcrumbs */}
        <Breadcrumb
            style={{marginBottom: '15px', fontSize: '20px', paddingLeft: 30}}
            items={breadcrumbItems}
        />
        {/* Vùng chứa các chức năng như tìm kiếm, import, export */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBlock: '10px',
          paddingLeft: 30,
          paddingRight: 30
        }}>
          <Space>
            <Input
                placeholder="Search by StudentID or	FullName"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{width: 300}}
                prefix={<SearchOutlined/>}
            />
          </Space>
          <Space>
            <Button icon={<FileExcelOutlined/>} onClick={handleImportExcel}>
              Import Excel
            </Button>
            <Button icon={<FileExcelOutlined/>} onClick={handleExportExcel}>
              Export Excel
            </Button>
          </Space>
        </div>
        {/* Hiển thị bảng sinh viên */}
        <Table
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 30
            }}
            columns={columns}
            dataSource={students}
            rowKey="studentId"
            pagination={{
              current: current,
              pageSize: pageSize,
              total: totalPages,
            }}
            onChange={handleTableChange}
        />
      </>
  );
};

export default StudentTable;
