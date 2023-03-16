import { Store } from "../../Store";
import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Card, CardMedia } from "@material-ui/core";
import { Helmet } from "react-helmet-async";
import { Form, Input, Button, Divider } from "antd";
import { BulbOutlined } from "@ant-design/icons";
import * as actions from "../../redux/actions";
import "../../component/assets/css/Profile.css";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { updateUserProfile } from "../../api/index";
import { allPostsState$, allPostsLoading$ } from "../../redux/seclectors";
import { token } from "../../api/config";
import jwtDecode from "jwt-decode";
import LoadingBox from "../../component/LoadingBox/LoadingBox";
export default function Profile() {
  // fetch user posts
  const dispatch = useDispatch();
  const posts = useSelector(allPostsState$);
  const loading = useSelector(allPostsLoading$);
  const userID = jwtDecode(token)._id;

  //
  const { state } = useContext(Store);
  const user = state.userInfo;
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const [fullName, setFullName] = useState(user.fullName);
  const [toggle, setToggle] = useState(false);
  const toggleEdit = () => {
    setToggle(!toggle);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const updateUserProfileHandler = async (e) => {
    e.preventDefault();
    let data = previewSource;
    try {
      await updateUserProfile(userID, fullName, data);
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  React.useEffect(() => {
    dispatch(actions.getAllPosts.getAllPostsRequest());
  }, [dispatch]);
  const filteredPosts = posts.filter((post) => post.author._id === userID);
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Grid item xs={2} sm={2} md={4} />
      <Grid container item xs={8} sm={8} md={8}>
        <Grid item xs={2} sm={3} md={2}>
          <div style={{ marginTop: "10px" }}>
            {!previewSource ? (
              <label htmlFor="image">
                <img
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "100px",
                  }}
                  src={user.avatar}
                  alt={user.fullName}
                />
                {toggle && (
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    style={{ display: "none" }}
                  />
                )}
              </label>
            ) : (
              <label htmlFor="image">
                <img
                  src={previewSource}
                  alt="chosen"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "100px",
                  }}
                  onChange={handleFileInputChange}
                  value={fileInputState}
                />
                {toggle && (
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    style={{ display: "none" }}
                  />
                )}
              </label>
            )}
          </div>
        </Grid>
        <Grid item xs={10} sm={9} md={8}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {toggle ? (
              <div>
                <Input
                  value={fullName}
                  className="profile-name"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <Input
                  value={user.fullName}
                  className="profile-name"
                  bordered={false}
                />
              </div>
            )}

            <Form.Item className="edit-profile">
              <Button onClick={() => toggleEdit()}>Edit Profile</Button>
              {toggle && (
                <Button
                  style={{ marginLeft: "10px" }}
                  onClick={(e) => updateUserProfileHandler(e)}
                >
                  Save
                </Button>
              )}
            </Form.Item>
          </div>
          <div style={{ marginLeft: "20px" }}>
            You have {filteredPosts.length} ideas now
          </div>
        </Grid>
      </Grid>
      <Divider>Posts</Divider>
      {/* Post item */}
      <Grid item xs={2} sm={2} />
      <Grid container item xs={10} sm={10}>
        {loading ? (
          <LoadingBox />
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Card
                style={{
                  maxWidth: "75%",
                  maxHeight: "300px",
                  marginBottom: "25px",
                }}
              >
                <CardMedia
                  style={{
                    height: "300px",
                    borderRadius: "0px",
                  }}
                  image={post.attachment}
                  title={post.title}
                  component="img"
                />
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sm={9}>
            <div className="no-post">
              <img
                style={{ height: "100px", width: "100px" }}
                src="https://thumbs.dreamstime.com/b/pictograph-light-bulb-icon-circle-vector-iconic-design-symbol-white-background-98493546.jpg"
                alt="icon"
              />
            </div>
            <h1 className="no-post">Share ideas</h1>
            <h3 className="no-post">
              When you share photos, they will appear on your profile.
            </h3>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
