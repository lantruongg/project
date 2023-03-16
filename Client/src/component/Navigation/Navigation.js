import Icon, {
  UserOutlined,
  HomeOutlined,
  ApartmentOutlined,
  BarsOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import "../assets/css/Navigation.css";
import { Layout, Menu, theme, Avatar } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { Store } from "../../Store";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { fetchUserByID } from "../../api";
const { Sider } = Layout;

export default function Navigation() {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("userInfo");
      if (token) {
        const userID = jwtDecode(token)._id;
        if (userID) {
          try {
            const { data } = await fetchUserByID(userID);
            ctxDispatch({ type: "GET_USER", payload: data });
          } catch (err) {
            toast.error(getError(err));
          }
        }
        return;
      }
      return;
    };
    fetchUser();
  }, [ctxDispatch]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const role = state.userInfo.role;
  const linkRoutes =
    role === "Admin"
      ? ["/", "/department", "/categories", "/dashboard", "/qa", "/profile"]
      : ["/", "/department", "/categories", "/profile"];
  const navName =
    role === "Admin"
      ? [
          "Home",
          "Department",
          "Categories",
          "Admin Dashboard",
          "QA Coordinator",
          "Profile",
        ]
      : ["Home", "Department", "Categories", "Profile"];
  // Hide navbar when route === /login or /register
  const withOutNavbarRoutes = ["/login", "/register"];
  const { pathname } = useLocation();
  if (withOutNavbarRoutes.some((item) => pathname.includes(item))) return null;
  //
  const profile = () => (
    <img
      style={{
        width: "16px",
        height: "16px",
      }}
      src={state.userInfo.avatar}
      alt={state.userInfo.fullName}
    />
  );

  const ProfileOutlined = (props) => <Icon component={profile} {...props} />;

  const icons =
    role === "Admin"
      ? [
          HomeOutlined,
          ApartmentOutlined,
          BarsOutlined,
          LineChartOutlined,
          UserOutlined,
          ProfileOutlined,
        ]
      : [HomeOutlined, ApartmentOutlined, BarsOutlined, ProfileOutlined];
  return (
    <Sider className="sider-style" breakpoint="lg" collapsedWidth="80">
      <Menu
        className="menu-style"
        mode="inline"
        defaultSelectedKeys={["0"]}
        items={[...icons].map((icon, index) => ({
          key: String(index + 1),
          icon: React.createElement(icon),
          label: (
            <Link style={{ textDecoration: "none" }} to={linkRoutes[index]}>
              {navName[index]}
            </Link>
          ),
        }))}
      />
    </Sider>
  );
}
