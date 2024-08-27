import Input from "antd/es/input/Input.js";
import {Button, Modal, notification} from "antd";
import {useState} from "react";
import {createUserAPI} from "../../services/api.service.js";

const UserForm = (props) => {
  const { loadUser } = props;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
  }

  const handleCreateUser = async () => {
    const res = await createUserAPI(fullName, email, password, phone);
    if (res.data ) {
      notification.success({
        message: "User created successfully",
        description: "User created successfully"
      });
      resetAndCloseModal();
      await loadUser();
    }
    else {
      notification.error({
        message: "User created failed",
        description: JSON.stringify(res.message)
      });
    }
  }
  return (
      <div className="user-form" style={{margin: "20px 0"}}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <h3>Table User</h3>
          <Button onClick={() => setIsModalUpdateOpen(true)} type="primary">Create
            user</Button>
        </div>
        <Modal title="Create User"
               okText={"Create"}
               open={isModalUpdateOpen}
               onOk={() => handleCreateUser()}
               maskClosable={false}
               onCancel={() => resetAndCloseModal()}>
          <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <div>
              <label>FullName</label>
              <Input value={fullName}
                     onChange={(e) => setFullName(e.target.value)}/>
            </div>
            <div>
              <label>Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
              <label>Password</label>
              <Input.Password value={password}
                              onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
              <label>Phone number</label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)}/>
            </div>

          </div>

        </Modal>
      </div>

  );
};

export default UserForm;