import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { departmentsLoading$, departmentsState$ } from "../../../redux/seclectors";

import * as actions from "../../../redux/actions";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Department from "./department";
import { Space, Table, Button, Modal, Input } from "antd";
import LoadingBox from "../../../component/LoadingBox/LoadingBox";
const { TextArea } = Input;
export default function DepartmentManage() {

  const dispatch_de = useDispatch()
  const departments = useSelector(departmentsState$)
  const loading = useSelector(departmentsLoading$)
  const [ModaldepOpen, setModaldepOpen] = useState(false);
  const [data, setdata] = React.useState({
    name: "",
  });
  const depart = departments?.map((department) => ({
    key: department._id,
    name: department.name,
  }));
  const viewModal = React.useCallback(() => {

   setModaldepOpen(true);
  },[])
  const deletedepartHandler = React.useCallback((record_dep) => {
    dispatch_de(actions.deleteDepartments.deleteDepartmentsRequest(record_dep._id))
  }, [dispatch_de])
  const columns = [
    {
      title: "Department",
      dataIndex: "name",
      key: "name",
      width: "10%",
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record_dep) => (
        <Space size="middle">
          <Department key={record_dep._id} record_dep={record_dep}></Department>
          <Link onClick={() => deletedepartHandler(record_dep)}>Delete</Link>
        </Space>
      ),
    },

  ]
  const handleclose = React.useCallback(() => {
    setModaldepOpen(false);
  }, []);
  const onSubmit = React.useCallback(() => {
    dispatch_de(actions.createDepartments.createDepartmentsRequest(data));
    handleclose();
  }, [data, dispatch_de, handleclose]);
  const checkToDepartment = () => {
    return data.name === "";
  };

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={2} sm={2} />
      <Grid item xs={10} sm={10}>

        <Button type="primary" onClick={viewModal}> Add new department</Button>
        <Modal open={ModaldepOpen}
          onOk={handleclose}
          onCancel={handleclose}
          footer={null}
          className="container"
        >
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} lg={12} className="row-new-post">
              <center>Create new department</center>
            </Grid>
            <Grid item xs={12} lg={12} className="row-new-post">
              <TextArea
                allowClear
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
                placeholder="Write the name of department"
                size="large"
                value={data.name}
                onChange={(e) => setdata({ ...data, name: e.target.value })}
                required
              />
              <Button
                disabled={checkToDepartment()}
                type="primary"
                block
                onClick={onSubmit}
              >
                Add new
              </Button>
            </Grid>
          </Grid>
        </Modal>
        {loading ? (
          <LoadingBox />
        ) : (
          <Table columns={columns} dataSource={depart} />
        )}
      </Grid>
    </Grid>
  );
}
