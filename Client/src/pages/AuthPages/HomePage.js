import React from "react";
import { Container } from "@material-ui/core";
import Header from "../../component/header/index";
import PostList from "../../component/PostList";
import { Grid } from "@material-ui/core";
import AccountManage from "../../component/Account/AccountSwitch";
import { Helmet } from "react-helmet-async";
import { FloatButton } from "antd";
import Navigation from "../../component/Navigation/Navigation";

export default function HomePage() {
  return (
    <Container style={{ maxWidth: "100vw" }} className="{}">
      <Helmet>
        <title>Homepage</title>
      </Helmet>
      <Header />
      <Grid container alignItems="stretch">
        <Grid item xs={2} sm={2} />

        <Grid item xs={7} sm={7}>
          <PostList />
        </Grid>
        <Grid item xs={3} sm={3}>
          <AccountManage />
        </Grid>
      </Grid>
      {/* <BackTop /> */}
      <FloatButton.BackTop />
    </Container>
  );
}
