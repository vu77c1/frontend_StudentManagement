import {Col, Row} from "antd";
import fptLogo from '../../assets/fpt-logo.png'; // Đảm bảo đúng đường dẫn đến hình ảnh
const Header = () => {

  return (
      <>
        <Row style={{ height: 70, backgroundColor: "#1677ff", alignItems: 'center' }}>
          <Col style={{width:'100px',height:'70px',position:'absolute'}} span={5}>
            <img src={fptLogo} alt="FPT Logo" style={{ width:'100%', height: '100%' }} /> {/* Chỉnh lại src và style của hình ảnh */}
          </Col>
          <Col span={19}>
            <div style={{ color: 'white', fontSize: '20px', textAlign:'center', display:"flex", justifyContent:"end" }}> {/* Chỉnh lại style của menu */}
              <p></p>
            </div>
          </Col>
        </Row>
      </>
  );
};
export default Header;