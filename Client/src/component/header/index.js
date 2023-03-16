import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";
import { Link } from "react-router-dom";
export default function Header() {
  const classses = useStyles();
  return (
    <Typography variant="h4" align="center" className={classses.container}>
      <Link style={{ textDecoration: "none", color: "white" }}>GreFeed</Link>
    </Typography>
  );
}
