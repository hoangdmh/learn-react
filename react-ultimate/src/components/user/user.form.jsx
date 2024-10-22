import {
  Input,
  notification,
  Row,
  Button,
  Typography,
  Modal,
} from "antd";
const { Text, Title } = Typography;

import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = (props) => {
  const { loadUser } = props;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleSubmitCreateUser = async () => {
    const res = await createUserAPI(fullName, email, password, phone);
    if (res.data) {
      notification.success({
        message: "Create user",
        description: "Tạo user thành công",
      });
      resetCloseModal();
      await loadUser();
    } else {
      notification.error({
        message: "Error Create user",
        description: JSON.stringify(res.message),
      });
    }
  };

  const resetCloseModal = () => {
    setIsModalOpen(false);
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
  }
  return (
    <div
      style={{ display: "flex", gap: 20, flexDirection: "column", padding: 20 }}
    >
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <Title level={4}>Table User</Title>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create user
        </Button>
      </Row>

      <Modal
        title="Create User"
        okText="CREATE"
        open={isModalOpen}
        onOk={handleSubmitCreateUser}
        onCancel={resetCloseModal}
      >
        <div
          style={{
            display: "flex",
            gap: 20,
            flexDirection: "column",
          }}
        >
          <Row>
            <Text>Full name</Text>
            <Input
              placeholder="fullName"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </Row>
          <Row>
            <Text>Email</Text>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Row>
          <Row>
            <Text>Password</Text>
            <Input.Password
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Row>
          <Row>
            <Text>Phone number</Text>
            <Input
              placeholder="Phone number"
              type="number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default UserForm;
