import React from "react";
import { Link } from "react-router-dom";
import "../../component/assets/css/NotFound.css";
import { Helmet } from "react-helmet-async";
import { Result, Button } from "antd";
const NotFound = () => {
  return (
    <div className="error-page">
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <Link to="/" style={{ textDecoration: "none" }}>
              Back Home
            </Link>
          </Button>
        }
      />{" "}
    </div>
  );
};

export default NotFound;
