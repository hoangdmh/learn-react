import { Drawer, Button, notification } from "antd";
import { useState } from "react";
import { handleUploadFile, updateAvatarUser } from "../../services/api.service";

import {
  WhatsAppOutlined,
  MailOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const ViewUserDetail = (props) => {
  const {
    dataDetailUser,
    setDataDetailUser,
    isDetailUserOpen,
    setIsDetailUserOpen,
    loadUser,
  } = props;

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChangeUploadFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleUpdateUserAvatar = async () => {
    //step1: upload file
    const resUpload = await handleUploadFile(selectedFile, "avatar");
    if (resUpload.data) {
      //step2: update user
      const newAvatar = resUpload.data.fileUploaded;
      const { _id, fullName, phone } = dataDetailUser;
      const resUpdateAvatar = await updateAvatarUser(
        _id,
        fullName,
        phone,
        newAvatar
      );
      if (resUpdateAvatar.data) {
        //Clear data
        setIsDetailUserOpen(false);
        setSelectedFile(null);
        setPreview(null);
        //Load again user
        await loadUser();

        notification.success({
          message: "Update avatar user",
          description: "Update avatar thành công",
        });
      } else {
        notification.error({
          message: "Error update avatar",
          description: JSON.stringify(resUpdateAvatar.message),
        });
      }
    } else {
      notification.error({
        message: "Error Update Avatar user",
        description: JSON.stringify(resUpload.message),
      });
    }
  };

  return (
    <Drawer
      title="Detail User"
      onClose={() => {
        setDataDetailUser({});
        setIsDetailUserOpen(false);
      }}
      open={isDetailUserOpen}
    >
      {dataDetailUser ? (
        <>
          <p style={{ display: "flex", gap: "20px", marginBottom: 10 }}>
            <TeamOutlined />
            <span>{dataDetailUser.fullName}</span>
          </p>
          <p style={{ display: "flex", gap: "20px", marginBottom: 10 }}>
            <MailOutlined />
            <span>{dataDetailUser.email}</span>
          </p>
          <p style={{ display: "flex", gap: "20px", marginBottom: 10 }}>
            <WhatsAppOutlined />
            <span>{dataDetailUser.phone}</span>
          </p>
          <p>Avatar:</p>
          <div
            style={{
              marginTop: 10,
              height: 100,
              width: 100,
              border: "1px solid #ccc",
            }}
          >
            <img
              style={{
                objectFit: "contain",
                height: "100%",
                width: "100%",
              }}
              height={150}
              width={150}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                dataDetailUser.avatar
              }`}
            />
          </div>
          <div>
            <label
              htmlFor="btnUpload"
              style={{
                display: "block",
                width: "fit-content",
                marginTop: "15px",
                padding: "5px 10px",
                background: "orange",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Upload Avatar
            </label>
            <input
              onChange={(event) => handleChangeUploadFile(event)}
              type="file"
              hidden
              id="btnUpload"
            />
          </div>
          {preview && (
            <>
              <div
                style={{
                  marginTop: 10,
                  height: 100,
                  width: 100,
                  marginBottom: 5,
                }}
              >
                <img
                  style={{
                    objectFit: "contain",
                    height: "100%",
                    width: "100%",
                  }}
                  height={150}
                  width={150}
                  src={preview}
                />
              </div>
              <Button type="primary" onClick={() => handleUpdateUserAvatar()}>
                Save
              </Button>
            </>
          )}
        </>
      ) : (
        <>
          <p>Không có dữ liệu</p>
        </>
      )}
    </Drawer>
  );
};
export default ViewUserDetail;
