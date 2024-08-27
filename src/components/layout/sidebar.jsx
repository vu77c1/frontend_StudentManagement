import React, {useContext, useEffect, useState} from 'react';
import {
  HomeOutlined,
  AppstoreOutlined,
  UserAddOutlined,
  BookOutlined,
  BankOutlined,
  TeamOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import {Menu} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../../context/auth.context.jsx";

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {user} = useContext(AuthContext);

  console.log("check", user);

  const navigate = useNavigate(); // Hook để điều hướng sau khi đăng xuất
  const handleLogin = () => {
    setIsLoggedIn(true);
    // Add your login logic here
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Xóa token khỏi localStorage
    setIsLoggedIn(false); // Cập nhật trạng thái đăng nhập
    navigate('/login'); // Điều hướng đến trang đăng nhập sau khi đăng xuất
  };

  const hasAccess = (roles) => roles.includes('SYSADMIN') || roles.includes(
      'ADMIN');
  const hasRoleTeacher = (roles) => roles.includes('TEACHER');
  const hasRoleStudent = (roles) => roles.includes('STUDENT');

  const items = [
    {
      key: 'home',
      label: <Link to={"/"}>Home</Link>,
      icon: <HomeOutlined/>,
    },
    hasAccess(user?.role || []) && {
      key: 'student',
      label: 'Student Management',
      icon: <TeamOutlined/>,
      children: [
        {
          label: <Link to={"/admin/students"}>List Students</Link>,
          key: 'student-list',
          icon: <AppstoreOutlined/>,
        },
        {
          label: <Link to={"/admin/students/add"}>Add Student</Link>,
          key: 'student-add',
          icon: <UserAddOutlined/>,
        },
      ],
    },
    hasAccess(user?.role || []) && {
      key: 'university',
      label: 'University Management',
      icon: <BankOutlined/>,
      children: [
        {
          label: <Link to={"/admin/university"}>List Universities</Link>,
          key: 'university-list',
          icon: <AppstoreOutlined/>,
        },
        {
          label: <Link to={"/admin/university/add"}>Add University</Link>,
          key: 'university-add',
          icon: <UserAddOutlined/>,
        },
      ],
    },
    hasAccess(user?.role || []) && {
      key: 'department',
      label: 'Department Management',
      icon: <BookOutlined/>,
      children: [
        {
          key: 'department-list',
          label: <Link to={"/admin/department"}>List Departments</Link>,
          icon: <AppstoreOutlined/>,
        },
        {
          key: 'department-add',
          label: <Link to={"/admin/department/add"}>Add Departments</Link>,
          icon: <AppstoreOutlined/>,
        },
      ],
    },
    hasAccess(user?.role || []) && {
      key: 'course',
      label: 'Course Management',
      icon: <BookOutlined/>,
      children: [
        {
          key: 'course-list',
          label: <Link to={"/admin/course"}>List Courses</Link>,
          icon: <AppstoreOutlined/>,
        },
        {
          key: 'course-add',
          label: <Link to={"/admin/course/add"}>Add Course</Link>,
          icon: <AppstoreOutlined/>,
        },
      ],
    },
    hasRoleStudent(user?.role || []) &&{
      key: 'student-public',
      label: 'Student',
      icon: <BookOutlined/>,
      children: [
        {
          key: 'department-list',
          label: <Link to={"/student/scores"}>Xem điểm</Link>,
          icon: <AppstoreOutlined/>,
        },
        {
          key: 'department-add',
          label: <Link to={"/student/profile"}>Profile</Link>,
          icon: <AppstoreOutlined/>,
        },
      ],
    },
    hasRoleTeacher(user?.role || []) &&{
      key: 'teacher-public',
      label: 'Teacher',
      icon: <BookOutlined/>,
      children: [
        {
          key: 'enrollment-list',
          label: <Link to={"/teacher/enrollment"}>Danh sách môn học</Link>,
          icon: <AppstoreOutlined/>,
        },
        {
          key: 'department-add',
          label: <Link to={"/student/profile"}>Profile</Link>,
          icon: <AppstoreOutlined/>,
        },
      ],
    },
    !isLoggedIn
        ? {
          key: 'logout',
          label: 'Logout',
          icon: <LogoutOutlined/>,
          onClick: handleLogout,
        }
        : {
          key: 'login',
          label: <Link to={"/login"}>Login</Link>,
          icon: <LoginOutlined/>,
          onClick: handleLogin,
        },
  ];

  return (
      <>
        <Menu
            style={{
              width: '100%',
            }}
            theme={"light"}
            mode={"inline"}
            items={items}
        />
      </>
  );
};

export default Sidebar;
