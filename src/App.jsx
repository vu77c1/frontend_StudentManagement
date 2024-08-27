import {Col, Row} from "antd";
import Header from "./components/layout/header.jsx";
import Sidebar from "./components/layout/sidebar.jsx";
import Footer from "./components/layout/footer.jsx";
import {Outlet} from "react-router-dom";
import {useContext, useEffect} from "react";
import {AuthContext} from "./context/auth.context.jsx";
import {getAccountAPI} from "./services/api.service.js";

function App() {
  const {setUser} = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, [])
  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    if (res.status === 200 && res.data) {
      setUser(res.data)
    }
  }

  return (
      <>
        <Row>
          <Col span={24}>
            <Header/>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <Sidebar/>
          </Col>
          <Col span={20}>
            <Outlet/>
          </Col>
        </Row>

        <Row>
          <Footer/>
        </Row>
      </>
  )
}

export default App
