import React, { useRef, useContext, useState } from "react";
import { Grid } from "@material-ui/core";
import { Modal, Switch } from "antd";
import { Store } from "../../Store";
import "../assets/css/HomeScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, showModal, createPosts } from "../../redux/actions";
import {
  categoriesState$,
  departmentsState$,
  modalState$,
} from "../../redux/seclectors";
import { PictureOutlined, CloseOutlined } from "@ant-design/icons";
import { Input, Select, Button } from "antd";
import { Link } from "react-router-dom";
import DrawExpand from "./Drawer";
import { toast } from "react-toastify";
import { getError } from "../../utils";

const { TextArea } = Input;
const { Option } = Select;

export default function IdeaBox() {
  const dispatch = useDispatch();
  const departments = useSelector(departmentsState$);
  const categories = useSelector(categoriesState$);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckChange = (isChecked) => {
    setIsChecked(isChecked);
  };

  const departmentref = useRef(null);
  const cateref = useRef(null);
  const { isShow } = useSelector(modalState$);
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [data, setdata] = React.useState({
    title: "",
    author: "",
    content: "",
    department: "",
    categories: "",
    attachment: "",
    isAnonymous: false,
  });
  const departget = (e) => {
    setdata({ ...data, department: e });
    data.department = departmentref.current.value;
  };
  const categet = (e) => {
    setdata({ ...data, categories: e });
    data.categories = cateref.current.value;
  };
  const handleOk = React.useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);
  const viewModal = React.useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);
  const onSubmit = React.useCallback(() => {
    try {
      dispatch(createPosts.createPostsRequest(data));
      handleOk();
      toast.success(
        "Created idea successfully. Please wait for Admin to accept your idea"
      );
    } catch (err) {
      toast.error(getError(err));
    }
  }, [data, dispatch, handleOk]);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const checkToPost = () => {
    return (
      data.title === "" ||
      data.content === "" ||
      data.attachment === "" ||
      isChecked === false
    );
  };
  const [fileInputState, setFileInputState] = useState("");
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setdata({ ...data, attachment: reader.result });
    };
  };

  const user = state.userInfo;
  const holder = "What's on your mind " + user.fullName + "?";

  return (
    <div>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} lg={12} className="idea">
          <div>
            <Link to="/profile">
              <img alt={user?.fullName} src={user?.avatar} />
            </Link>
          </div>
          <div className="idea-create" onClick={viewModal}>
            &nbsp; What's on your mind?
          </div>
        </Grid>
      </Grid>
      <Modal
        open={isShow}
        onOk={handleOk}
        onCancel={handleOk}
        footer={null}
        className="container"
      >
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} lg={12} className="row-new-post">
            <center>Create new post</center>
          </Grid>
          <Grid item xs={7} lg={7} className="upload">
            {data.attachment ? (
              <div className="upload-file">
                <img
                  style={{ borderRadius: "0" }}
                  src={data.attachment}
                  alt="a"
                />
                {data.attachment && (
                  <CloseOutlined
                    onClick={() => setdata({ ...data, attachment: "" })}
                    className="close-upload"
                  />
                )}
              </div>
            ) : (
              <div className="upload-file">
                <div>
                  <PictureOutlined
                    style={{
                      fontSize: "100px",
                    }}
                  />
                </div>
                <div className="input-file">
                  {/* <FileBase64
                    accept="image/*"
                    multiple={false}
                    type="file"
                    // value={data.attachment}
                    // onDone={({ base64 }) =>
                    //   setdata({ ...data, attachment: base64 })
                    // }
                  /> */}
                  <input
                    type="file"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                  />
                </div>
                <div className="already-uploaded"></div>
              </div>
            )}
          </Grid>
          <Grid item xs={5} lg={5} className="user-fill">
            <div className="user-container">
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="post-user user-mg">
                  <span>
                    <img src={user.avatar} alt={user.fullName} />
                  </span>
                  <span>{user.fullName}</span>
                </div>
              </Link>
              <div className="user-mg">
                <Input
                  allowClear
                  placeholder="Any good title?"
                  size="large"
                  // value={data.title}
                  onChange={(e) =>
                    setdata({
                      ...data,
                      title: e.target.value,
                      author: userInfo._id,
                    })
                  }
                  required
                />
              </div>
              <div className="user-mg">
                <TextArea
                  allowClear
                  autoSize={{
                    minRows: 3,
                    maxRows: 5,
                  }}
                  placeholder={holder}
                  size="large"
                  // value={data.content}
                  onChange={(e) =>
                    setdata({ ...data, content: e.target.value })
                  }
                  required
                />
              </div>
              <div className="user-mg">
                <Select
                  defaultValue="Choose a department"
                  style={{ width: "100%" }}
                  size="large"
                  required
                  onChange={(e) => departget(e)}
                  ref={departmentref}
                >
                  {departments?.map((department) => (
                    <Option key={department._id} value={department.name}>
                      {department.name}
                    </Option>
                  ))}
                </Select>
                <Select
                  defaultValue="Choose a category"
                  style={{ width: "100%", top: "20px" }}
                  size="large"
                  required
                  onChange={(e) => categet(e)}
                  ref={cateref}
                >
                  {categories?.map((category) => (
                    <Option key={category._id} value={category.name}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                <Switch
                  style={{ width: "100%", top: "20px" }}
                  checkedChildren="Anonymous"
                  unCheckedChildren={user.fullName}
                  onChange={() =>
                    setdata({
                      ...data,
                      isAnonymous: !data.isAnonymous,
                    })
                  }
                ></Switch>
              </div>
              <div style={{ marginTop: "34%", fontSize: "16px" }}>
                Click to view{" "}
                <span className="term" onClick={showDrawer}>
                  GreFeed Terms and Conditions
                </span>
                <DrawExpand
                  onClose={onClose}
                  open={open}
                  onCheckChange={handleCheckChange}
                />
                <Button
                  disabled={checkToPost()}
                  type="primary"
                  block
                  onClick={onSubmit}
                >
                  Post
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}
