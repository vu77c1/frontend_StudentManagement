import React, { useEffect, useState } from 'react';
import {
  notification,
  Popconfirm,
  Space,
  Table,
  Button,
  Breadcrumb,
  Input
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  FileExcelOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  deleteUniversity,
  getAllUniversities
} from "../../services/api.university.service.js";

const UniversityTable = () => {
  const [university, setUniversity] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const loadUniversity = async () => {
    try {
      const res = await getAllUniversities();
      if (res.data) {
        setUniversity(res.data);
        setFilteredData(res.data); // Initialize filtered data
      }
    } catch (error) {
      console.error('Failed to fetch university:', error);
    }
  };

  useEffect(() => {
    loadUniversity();
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchText.toLowerCase();
    const filtered = university.filter((item) => {
      return (
          item.universityName.toLowerCase().includes(lowercasedFilter) ||
          item.address.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredData(filtered);
  }, [searchText, university]);

  const handleDeleteUniversity = async (id) => {
    const res = await deleteUniversity(id);
    if (res.data) {
      notification.success({
        message: "Delete university",
        description: "Xóa trường đại học thành công"
      });
      await loadUniversity();
    } else {
      notification.error({
        message: "Error university user",
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
      title: 'University ID',
      dataIndex: 'universityId',
      key: 'universityId',
    },
    {
      title: 'University Name',
      dataIndex: 'universityName',
      key: 'universityName',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Founded Year',
      dataIndex: 'foundedYear',
      key: 'foundedYear',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to={`/admin/university/edit/${record.universityId}`}>
              <EditOutlined style={{ cursor: 'pointer', color: 'orange' }} />
            </Link>
            <Popconfirm
                title="Xóa trường đại học"
                description="Bạn chắc chắn xóa trường đại học này?"
                onConfirm={() => handleDeleteUniversity(record.universityId)}
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
      title: 'University Management',
    },
    {
      title: 'List University',
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
                placeholder="Search by Name or Address"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 300 }}
            />
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
            dataSource={filteredData.slice((current - 1) * pageSize, current * pageSize)}
            rowKey="universityId"
            pagination={{
              current: current,
              pageSize: pageSize,
              total: filteredData.length, // Tổng số mục sau khi lọc
              onChange: (page, size) => {
                setCurrent(page);
                setPageSize(size);
              }
            }}
        />
      </>
  );
};

export default UniversityTable;
