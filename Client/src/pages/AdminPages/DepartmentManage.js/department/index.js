import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import React from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";

const { TextArea } = Input;
export default function Department({ record_dep }) {
  const dispatch_de = useDispatch()
  const [data, setdata] = React.useState({});
  const onUpdateHandler = React.useCallback(() => {
    dispatch_de(actions.updateDepartments.updateDepartmentsRequest({ _id: record_dep._id,...data }))
    setdata({ _id: '', name: '' })
  }, [data, dispatch_de,record_dep]);
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={8} lg={8} className="row-new-post">
        <TextArea
          allowClear
          autoSize={{
            minRows: 1,
            maxRows: 1,
          }}
          placeholder='Write the updated name'
          size="large"
          value={data.name}
          onChange={(e) =>
            setdata({ ...data, name: e.target.value })
          }
          required
        />
      </Grid>
      <Grid item xs={4} lg={4} className="row-new-post">
        <Link onClick={onUpdateHandler}>Update department</Link>
      </Grid>
    </Grid >
  );
}