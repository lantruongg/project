import { Tabs } from "antd";
import React from "react";
import UserManage from "./UserManage";
import DepartmentManage from "./DepartmentManage.js/index.js";
import CategoryManage from "./CategoryManage";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import {
  UserOutlined,
  ApartmentOutlined,
  BarsOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import PostManage from "./PostManage";
const DashBoard = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.getPosts.getPostsRequest());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(actions.getDepartments.getDepartmentsRequest());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(actions.getCategories.getCategoriesRequest());
  }, [dispatch]);
  const children = [
    <UserManage />,
    <DepartmentManage />,
    <CategoryManage />,
    <PostManage />,
    "",
  ];
  const tabName = [
    <span>User Manage</span>,
    <span>Department Manage</span>,
    <span>Category Manage</span>,
    <span>Post Manage</span>,
  ];
  const icons = [
    <UserOutlined />,
    <ApartmentOutlined />,
    <BarsOutlined />,
    <BulbOutlined />,
  ];
  return (
    <div>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <Tabs
        defaultActiveKey="1"
        centered
        items={new Array(4).fill(null).map((_, i) => {
          return {
            label: (
              <span>
                {icons[i]}
                {tabName[i]}
              </span>
            ),
            key: i,
            children: children[i],
          };
        })}
      />
    </div>
  );
};
export default DashBoard;
