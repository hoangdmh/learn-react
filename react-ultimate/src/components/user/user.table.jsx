import { useState } from "react";
import { Table, Popconfirm, notification } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UpdateUserModal from "./update.user.modal";
import ViewUserDetail from "./view.user.detail";
import { deleteUserAPI } from "../../services/api.service";

const UserTable = (props) => {
  const {
    dataUser,
    loadUser,
    current,
    pageSize,
    total,
    setCurrent,
    setPageSize,
  } = props;

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const [dataDetailUser, setDataDetailUser] = useState({});
  const [isDetailUserOpen, setIsDetailUserOpen] = useState(false);
  const columns = [
    {
      key: "_id",
      title: "STT",
      render: (_, record, index) => {
        return (
          <>{index+1 + ((current -1)*pageSize)}</>
        );
      },
    },
    {
      key: "_id",
      title: "Full Name",
      dataIndex: "fullName",
      render: (_, record) => {
        return (
          <a href="#" onClick={() => handleDetailUser(record)}>
            {record.fullName}
          </a>
        );
      },
    },
    {
      key: "_id",
      title: "Phone",
      dataIndex: "phone",
    },
    {
      key: "_id",
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined
            onClick={() => handleUpdateUser(record)}
            style={{ cursor: "pointer", color: "orange" }}
          />
          <Popconfirm
            title="Delete user"
            description="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUser(record._id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleUpdateUser = (user) => {
    setDataUpdate(user);
    setIsModalUpdateOpen(true);
  };

  const handleDetailUser = (user) => {
    setDataDetailUser(user);
    setIsDetailUserOpen(true);
  };

  const handleDeleteUser = async (id) => {
    const res = await deleteUserAPI(id);
    if (res.data) {
      notification.success({
        message: "Delete user",
        description: "Delete user succeed",
      });
      await loadUser();
    } else {
      notification.error({
        message: "Error Delete user",
        description: JSON.stringify(res.message),
      });
    }
  };
  const cancel = () => {
    // console.log(e);
    return;
  };

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current) {
      if (+pagination.current != +current) {
        setCurrent(+pagination.current);
      }
    }
    if (pagination && pagination.pageSize) {
      if (pagination.pageSize != +pageSize) {
        setPageSize(pagination.pageSize);
      }
    }
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataUser}
        rowKey={"_id"}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />
      ;
      <UpdateUserModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />
      <ViewUserDetail
        dataDetailUser={dataDetailUser}
        setDataDetailUser={setDataDetailUser}
        isDetailUserOpen={isDetailUserOpen}
        setIsDetailUserOpen={setIsDetailUserOpen}
        loadUser={loadUser}
      />
    </>
  );
};
export default UserTable;
