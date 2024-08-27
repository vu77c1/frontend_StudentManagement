import {useContext} from "react";
import {Link, Navigate} from "react-router-dom";
import {Button, Result} from "antd";
import {AuthContext} from "../context/auth.context.jsx";

const PrivateRoute = ({ roles, children }) => {
  const {user} = useContext(AuthContext);
  console.log("check user: ", user.role)
// Kiểm tra nếu user đã đăng nhập và có role hợp lệ
  if (user && user.userId) {
    if (roles && roles.length > 0) {
      // Kiểm tra xem user có role nào khớp với roles được yêu cầu hay không
      const hasRequiredRole = roles.some(role => user.role.includes(role));
      if (!hasRequiredRole) {
        return (
            <Result
                status="403"
                title="Unauthorize!"
                subTitle="Bạn không có quyền truy cập vào trang này."
            />
        );
      }
    }
    return children;
  }

  // Nếu không đăng nhập, điều hướng về trang login
  return <Navigate to="/login" replace />;

  // return (
  //     <Result
  //         status="403"
  //         title="Unauthorize!"
  //         subTitle={"Bạn cần đăng nhập để truy cập nguồn tài nguyên này."}
  //         extra={<Button type="primary">
  //           <Link to="/">
  //             <span>Back to homepage</span>
  //           </Link>
  //         </Button>}
  //     />
  // )

}

export default PrivateRoute;
