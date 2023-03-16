import React from "react";
import { Typography } from "@material-ui/core";

export default function Department({ department }) {
  return (
    <li style={{ marginLeft: "100px" }}>
      <div className="column">
        <div className="icon">
          <i className="fas fa-globe-asia"></i>
        </div>
        <div className="details">
          {/* <Typography variant="h5" color="textPrimary">
            {department.name}
          </Typography> */}
        </div>
      </div>
      <div className="radio"></div>
    </li>
  );
}
