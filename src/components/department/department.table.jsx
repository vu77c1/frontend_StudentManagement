import React, { useEffect, useState } from 'react';
import {
  notification,
  Popconfirm,
  Space,
  Table,
  Button,
  Breadcrumb, Input
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  FileExcelOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAllDepartmentPaging,deleteDepartment } from "../../services/api.department.service.js";

const DepartmentTable = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const [department, setDepartment] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");

  const loadDepartment = async (page, size,searchId, searchName) => {
    try {
      const searchQuery = `departmentId:${searchId},departmentName:${searchName}`;

      const res = await getAllDepartmentPaging(page - 1, size,searchQuery);
      console.log(res.data);
      if (res.data) {
        setDepartment(res.data.items);
        setCurrent(page); // Trang hiện tại (1-based)
        setPageSize(size);
        setTotalPages(res.data.totalPages); // Tổng số trang
      }
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    }
  };

  useEffect(() => {
    // Tải dữ liệu khi các tham số tìm kiếm thay đổi
    loadDepartment(current, pageSize, searchId, searchName);
  }, [current, pageSize, searchId, searchName]);

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
    loadDepartment(current, pageSize,searchId, searchName);
  };

  const handleDeleteDepartment = async (id) => {
    const res = await deleteDepartment(id);
    if (res.data) {
      notification.success({
        message: "Delete Department",
        description: "Xóa khoa  thành công"
      });
      loadDepartment(current, pageSize,searchId, searchName);
    } else {
      notification.error({
        message: "Error Department user",
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
      title: 'Department ID',
      dataIndex: 'departmentId',
      key: 'departmentId',
    },
    {
      title: 'Department Name',
      dataIndex: 'departmentName',
      key: 'departmentName',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to={`/admin/department/edit/${record.departmentId}`}>
              <EditOutlined style={{ cursor: 'pointer', color: 'orange' }} />
            </Link>
            <Popconfirm
                title="Xóa khoa"
                description="Bạn chắc chắn xóa khoa  này?"
                onConfirm={() => handleDeleteDepartment(record.departmentId)}
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
      title: 'Department Management',
    },
    {
      title: 'List Department',
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
            <Input
                placeholder="Search by ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                style={{ width: 200 }}
            />
            <Input
                placeholder="Search by Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                style={{ width: 200 }}
            />
            <Button type="primary" onClick={() => loadDepartment(current, pageSize, searchId, searchName)}>
              Search
            </Button>
          </Space>
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
            dataSource={department}
            rowKey="departmentId"
            pagination={{
              current: current,
              pageSize: pageSize,
              total: totalPages, // Số lượng mục tổng cộng
            }}
            onChange={handleTableChange}
        />
      </>
  );
};

export default DepartmentTable;
