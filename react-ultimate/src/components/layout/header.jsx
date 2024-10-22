import { Menu, notification } from "antd";
import {
  UsergroupAddOutlined,
  LoginOutlined,
  HomeOutlined,
  AuditOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import { useState, useContext } from "react";

import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth.context";
import { logoutAPI } from "../../services/api.service";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [current, setCurrent] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = async () => {
    const res = await logoutAPI();
    if (res.data) {
      localStorage.removeItem("access_token");      
      setUser({
        id: "",
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
      })
      notification.success({
        message: "Logged out",
        description: "Logged succeed",
      });
      navigate("/");
    }
  };

  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>Users</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Books</Link>,
      key: "books",
      icon: <AuditOutlined />,
    },
    //Conditionally add object to an array while being declared
    ...(!user.id
      ? [
          {
            label: <Link to={"/login"}>Đăng nhập</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
        ]
      : []),
    ...(user.id
      ? [
          {
            label: `Welcome: ${user.fullName}`,
            key: "setting",
            icon: <AliwangwangOutlined />,
            children: [
              {
                label: <span onClick={() => handleLogout()}>Đăng xuất</span>,
                key: "logout",
              },
            ],
          },
        ]
      : []),
  ];

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
