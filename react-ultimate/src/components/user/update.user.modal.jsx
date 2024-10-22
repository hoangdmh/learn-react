import { useState, useEffect } from "react";
import { Input, notification, Row, Typography, Modal } from "antd";
const { Text } = Typography;
import { updateUser } from "../../services/api.service";

const UpdateUserModal = (props) => {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    loadUser,
  } = props;

  useEffect(() => {
    // console.log('useEffect dataUpdate props', dataUpdate);
    if(dataUpdate){
      setId(dataUpdate._id);
      setFullName(dataUpdate.fullName);
      setPhone(dataUpdate.phone);
    }
  }, [dataUpdate]);

  const handleUpdateUser = async () => {
    const res = await updateUser(id, fullName, phone);

    if (res.data) {
      notification.success({
        message: "Update user",
        description: "Update user thành công",
      });
      resetAndCloseModal();
      await loadUser();
    } else {
      notification.error({
        message: "Error update user",
        description: JSON.stringify(res.message),
      });
    }
  };

  const resetAndCloseModal = () => {
    setDataUpdate({});
    setIsModalUpdateOpen(false);
    setFullName("");
    setId("");
    setPhone("");
  };

  return (
    <Modal
      title="Update a User"
      okText={"SAVE"}
      open={isModalUpdateOpen}
      onOk={() => handleUpdateUser()}
      onCancel={() => resetAndCloseModal()}
    >
      <div style={{ display: "flex", gap: 20, flexDirection: "column" }}>
        <Row>
          <Text>ID</Text>
          <Input placeholder="" value={id} disabled />
        </Row>
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
  );
};
export default UpdateUserModal;
