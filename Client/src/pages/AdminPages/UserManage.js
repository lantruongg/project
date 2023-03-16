import { Grid } from "@material-ui/core";
import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers, deleteUser, registerUser } from "../../api/index";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import reducer from "../../component/Reducer/Reducer.js";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import LoadingBox from "../../component/LoadingBox/LoadingBox";
import React from "react";
import { Link } from "react-router-dom";
import { updateUser } from "../../api/index";
import { Select } from "antd";
import { useContext } from "react";
import { Store } from "../../Store";
import axios from "axios";
const { Option } = Select;
const UserManage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        dispatch({ type: "FETCH_USER_REQUEST" });
        const { data } = await fetchUsers();
        dispatch({ type: "FETCH_USER_SUCCESS", payload: data });
      } catch (err) {
        toast.error(getError(err));
        dispatch({
          type: "FETCH_USER_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchAllUsers();
  }, []);
  const [role, setRole] = useState("");
  const updateUserHandler = async (record) => {
    if (window.confirm("Are you sure to update this user?")) {
      try {
        const userID = record.key;
        await updateUser(userID, role);
        toast.success(`User updated to ${role} successfully`);
      } catch (err) {
        toast.error(getError(err));
      }
    }
  };
  const deleteUserHandler = async (record) => {
    if (window.confirm("Are you sure to delete this user?")) {
      try {
        const userID = record.key;
        await deleteUser(userID);
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(getError(err));
      }
    }
  };
  const downloadCsv = async () => {
    try {
      const response = await axios.get("/posts/export", {
        responseType: "blob",
      }); // replace with your API endpoint
      const data = response.data;
      const csvUrl = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = csvUrl;
      link.setAttribute("download", "output.csv");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };
  const [{ loading, users }, dispatch] = useReducer(reducer, {
    loading: true,
  });
  const data = users?.map((user) => ({
    key: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    department: user.department,
  }));
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      width: "30%",
      render: (text) => text,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "10%",
      render: (_, record) => (
        <Select
          size="large"
          defaultValue={record.role}
          style={{ width: "100%" }}
          onChange={(event) => setRole(event)}
        >
          <Option value="Admin">Admin</Option>
          <Option value="Staff">Staff</Option>
        </Select>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: "10%",
    },
    {
      title: "Action",
      key: "action",
      width: "20%",

      render: (_, record) => (
        <Space size="middle">
          <Link onClick={() => updateUserHandler(record)}>Update </Link>
          <Link onClick={() => deleteUserHandler(record)}>Delete</Link>
          <Button onClick={() => downloadCsv()}>Download</Button>
        </Space>
      ),
    },
  ];
  const [ModalOpen, setModalOpen] = useState(false);
  const handleClose = React.useCallback(() => {
    setModalOpen(false);
  }, []);
  const viewModal = React.useCallback(() => {
    setModalOpen(true);
  }, []);
  const [fullName, setFullName] = useState("");
  const [roleUser, setRoleUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const submitHandler = async () => {
    if (password !== rePassword) {
      toast.error("Password do not match");
      return;
    }
    try {
      await registerUser(fullName, email, password, roleUser);
      toast.success("User created successfully");
      // ctxDispatch({ type: "USER_LOGIN", payload: data });
      // localStorage.setItem("userInfo", data.token);
    } catch (err) {
      toast.error(getError(err));
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={2} sm={2} />
      <Grid item xs={10} sm={10}>
        {loading ? (
          <LoadingBox />
        ) : (
          <div>
            <Button type="primary" onClick={viewModal}>
              {" "}
              Add a new user
            </Button>
            <Modal
              open={ModalOpen}
              onOk={handleClose}
              onCancel={handleClose}
              footer={null}
              className="container-user"
            >
              <center className="register">
                <Form
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 400,
                  }}
                  autoComplete="off"
                  onFinish={(e) => submitHandler(e)}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input onChange={(e) => setEmail(e.target.value)} />
                  </Form.Item>
                  <Form.Item
                    label="Fullname"
                    name="fullname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your fullname!",
                      },
                    ]}
                  >
                    <Input onChange={(e) => setFullName(e.target.value)} />
                  </Form.Item>
                  <Form.Item
                    label="Role"
                    name="role"
                    rules={[
                      {
                        required: true,
                        message: "Please select role !",
                      },
                    ]}
                  >
                    <Select onChange={(e) => setRoleUser(e)}>
                      <Option value="Staff">Staff</Option>
                      <Option value="Admin">Admin</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Re-Password"
                    name="rePassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input your re-password!",
                      },
                    ]}
                  >
                    <Input.Password
                      onChange={(e) => setRePassword(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100px" }}
                    >
                      Add
                    </Button>
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      offset: 0,
                    }}
                  ></Form.Item>
                </Form>
              </center>
            </Modal>
            <Table columns={columns} dataSource={data} />
          </div>
        )}
      </Grid>
    </Grid>
  );
};
export default UserManage;
