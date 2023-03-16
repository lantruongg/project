import HomePage from "../pages/AuthPages/HomePage";
import NotFound from "../pages/NotAuthPages/NotFound";
import Login from "../pages/NotAuthPages/Login";
import Register from "../pages/NotAuthPages/Register";
import Profile from "../pages/AuthPages/Profile";
import DashBoard from "../pages/AdminPages/Dashboard";
import QA from "../pages/QAPages/QA";
import UserRoute from "../component/ProtectedRoute/UserRoute";
import AdminRoute from "../component/ProtectedRoute/AdminRoute";
import PostDetails from "../pages/PostDetails";
export const AllRoutes = [
  {
    path: "/",
    element: (
      <UserRoute>
        <HomePage />
      </UserRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/register", element: <Register /> },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/profile",
    element: (
      <UserRoute>
        <Profile />
      </UserRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashBoard />
      </AdminRoute>
    ),
  },
  {
    path: "/qa",
    element: (
      <AdminRoute>
        <QA />
      </AdminRoute>
    ),
  },
  {
    path: "/postdetails",
    element: <PostDetails />,
  },
];
export default AllRoutes;
