import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'nprogress/nprogress.css';

import {
  createBrowserRouter, RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/register.jsx";
import './style/global.css'
import ErrorPage from "./components/layout/error.jsx";
import {AuthWrapper} from "./context/auth.context.jsx";
import StudentTable from "./components/student/student.table.jsx";
import StudentAdd from "./components/student/student.add.jsx";
import StudentUpdate from "./components/student/student.update.jsx";
import UniversityTable from "./components/university/university.table.jsx";
import AddUniversity from "./components/university/university.add.jsx";
import UpdateUniversity from "./components/university/university.update.jsx";
import Home from "./components/Home/Home.jsx";
import PrivateRoute from "./pages/private.route.jsx";
import DepartmentTable from "./components/department/department.table.jsx";
import AddDepartment from "./components/department/department.add.jsx";
import UpdateDepartment from "./components/department/department.update.jsx";
import CourseTable from "./components/course/course.table.jsx";
import AddCourse from "./components/course/course.add.jsx";
import UpdateCourse from "./components/course/course.update.jsx";
import StudentViewScores from "./components/student/student.view.scores.jsx";
import StudentProfile from "./components/student/student.profile.jsx";
import EnrollmentCourseStudent
  from "./components/enrollment/enrollment.course.student.jsx";

const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  errorElement: <ErrorPage/>,
  children: [
    {
      index: true,
      element: <Home/>
    },
    {
      path: "/admin/students",
      element: <PrivateRoute
          roles={['SYSADMIN', 'ADMIN']}><StudentTable/></PrivateRoute>
    },
    {
      path: "/admin/students/add",
      element: <PrivateRoute
          roles={['SYSADMIN', 'ADMIN']}><StudentAdd/></PrivateRoute>
    },
    {
      path: "/admin/students/edit/:studentId",
      element: <PrivateRoute
          roles={['SYSADMIN', 'ADMIN']}> <StudentUpdate/></PrivateRoute>
    },
    {
      path: "/admin/university",
      element: <PrivateRoute
          roles={['SYSADMIN', 'ADMIN']}> <UniversityTable/></PrivateRoute>
    }, {
      path: "/admin/university/add",
      element: <PrivateRoute
          roles={['SYSADMIN', 'ADMIN']}><AddUniversity/></PrivateRoute>
    }
    , {
      path: "/admin/university/edit/:universityId",
      element: <PrivateRoute
          roles={['SYSADMIN', 'ADMIN']}><UpdateUniversity/></PrivateRoute>
    },
    {
      path: "/admin/department",
      element: <PrivateRoute
          roles={['SYSADMIN', 'ADMIN']}><DepartmentTable/></PrivateRoute>
    },
    {
      path: "/admin/department/add",
      element: <PrivateRoute
          roles={['SYSADMIN', 'ADMIN']}><AddDepartment/></PrivateRoute>
    },
    {
      path: "/admin/department/edit/:departmentId",
      element: <PrivateRoute
          roles={['SYSADMIN', 'ADMIN']}><UpdateDepartment/></PrivateRoute>
    },
    {
      path: "/admin/course",
      element: <PrivateRoute
          roles={['SYSADMIN', 'ADMIN']}><CourseTable/></PrivateRoute>
    },
    {
      path: "/admin/course/add",
      element: <PrivateRoute
          roles={['SYSADMIN', 'ADMIN']}><AddCourse/></PrivateRoute>
    },
    {
      path: "/admin/course/edit/:courseId",
      element: <PrivateRoute
          roles={['SYSADMIN', 'ADMIN']}><UpdateCourse/></PrivateRoute>
    },
    {
      path: "/student/scores",
      element: <PrivateRoute
          roles={['STUDENT']}><StudentViewScores/></PrivateRoute>
    },
    {
      path: "/student/profile",
      element: <PrivateRoute
          roles={['STUDENT']}><StudentProfile/></PrivateRoute>
    },
    {
      path: "/teacher/enrollment",
      element: <PrivateRoute
          roles={['TEACHER']}><EnrollmentCourseStudent/></PrivateRoute>
    },

  ],
},
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/register",
    element: <RegisterPage/>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthWrapper>
      <RouterProvider router={router}/>
    </AuthWrapper>
)
