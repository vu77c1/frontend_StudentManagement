import React, { useEffect, useState } from 'react';
import {
  notification,
  Popconfirm,
  Space,
  Table,
  Button, Breadcrumb,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  FileExcelOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  deleteCourse,
  getAllCoursePaging
} from "../../services/api.course.service.js";
const CourseTable = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const [course, setCourse] = useState([]);

  const loadCourse = async (page, size) => {
    try {
      const res = await getAllCoursePaging(page , size);
      console.log("check", res.data);
      if (res.data) {
        setCourse(res.data.items);
        setCurrent(page); // Trang hiện tại (1-based)
        setPageSize(size);
        setTotalPages(res.data.total); // Tổng số trang
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  useEffect(() => {
    // Tải dữ liệu khi các tham số current và pageSize thay đổi
   loadCourse(current, pageSize);
  }, [current, pageSize]);

  const handleTableChange = (pagination) => {
    console.log(pagination);
    const { current, pageSize } = pagination;

    if (current) {
      setCurrent(current); // Cập nhật trang hiện tại
    }

    if (pageSize) {
      setPageSize(pageSize); // Cập nhật kích thước trang
    }

    // Tải lại dữ liệu với trang và kích thước trang mới
    loadCourse(current, pageSize);
  };

  const handleDeleteCourse = async (id) => {
    const res = await deleteCourse(id);
    if (res.data) {
      notification.success({
        message: "Delete Course",
        description: "Xóa khóa học thành công"
      });
      loadCourse(current, pageSize);
    } else {
      notification.error({
        message: "Error Deleting Course",
        description: JSON.stringify(res.message)
      });
    }
  };

  const handleImportExcel = () => {
    notification.info({
      message: "Import Excel",
      description: "Import Excel chưa được triển khai"
    });
  };

  const handleExportExcel = () => {
    notification.info({
      message: "Export Excel",
      description: "Export Excel chưa được triển khai"
    });
  };

  const columns = [
    {
      title: 'Course ID',
      dataIndex: 'courseId',
      key: 'courseId',
    },
    {
      title: 'Course Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Credits',
      dataIndex: 'credits',
      key: 'credits',
    },
    {
      title: 'Department',
      dataIndex: ['department', 'departmentName'],
      key: 'department',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to={`/admin/course/edit/${record.courseId}`}>
              <EditOutlined style={{ cursor: 'pointer', color: 'orange' }} />
            </Link>
            <Popconfirm
                title="Delete Course"
                description="Bạn chắc chắn xóa khóa học này?"
                onConfirm={() => handleDeleteCourse(record.courseId)}
                okText="Yes"
                cancelText="No"
                placement="left"
            >
              <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
            </Popconfirm>
          </div>
      ),
    },
  ];

  const breadcrumbItems = [
    {
      title: 'Course Management',
    },
    {
      title: 'List Courses',
    },
  ];

  return (
      <>
        <Breadcrumb
            style={{ marginBottom: '15px', fontSize: '20px', paddingLeft: 30 }}
            items={breadcrumbItems}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBlock: '10px',
          paddingLeft: 30,
          paddingRight: 30
        }}>
          <Space>
            <Button icon={<FileExcelOutlined />} onClick={handleImportExcel}>
              Import Excel
            </Button>
            <Button icon={<FileExcelOutlined />} onClick={handleExportExcel}>
              Export Excel
            </Button>
          </Space>
        </div>
        <Table
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 30
            }}
            columns={columns}
            dataSource={course}
            rowKey="courseId"
            pagination={{
              current: current,
              pageSize: pageSize,
              total: totalPages, // Tổng số mục
            }}
            onChange={handleTableChange}
        />
      </>
  );
};

export default CourseTable;
