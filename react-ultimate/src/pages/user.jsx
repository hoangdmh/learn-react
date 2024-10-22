import { Typography } from 'antd';
const { Title,Text } = Typography;
import UserTable from "@components/user/user.table";
import UserForm from "@components/user/user.form";
import { useState, useEffect } from "react";
import { fetchAllUser } from "../services/api.service";

const UserPage = () => {
  const [dataUser, setDataUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadUser();
  }, [current, pageSize]);

  const loadUser = async () => {
    const res = await fetchAllUser(current, pageSize);
    if (res.data) {
      setDataUser(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };

  return (
    <>
      <Title level={2} type="success" direction="horizontal" style={{width: '100%', display: 'flex', justifyContent: 'center'}}>List User</Title>
      <UserForm loadUser={loadUser} />
      <UserTable
        dataUser={dataUser}
        loadUser={loadUser}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
      />
    </>
  );
};

export default UserPage;
