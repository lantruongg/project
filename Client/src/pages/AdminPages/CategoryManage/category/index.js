import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Input, DatePicker, Typography } from "antd";
const { TextArea } = Input;

export default function Category({ record_cat }) {
  const dispatch_ca = useDispatch();
  const [ModalCatUpdate, setModalCatUpdate] = useState(false);
  const [data, setdata] = React.useState({});
  const [defaultValue, setvalue] = React.useState({
    name: record_cat.name,
    description: record_cat.description,
    begin: record_cat.begindate,
    end: record_cat.enddate,
  });
  const handleOk = React.useCallback(() => {
    setModalCatUpdate(false);
  }, []);
  const viewModal = React.useCallback(() => {
    setModalCatUpdate(true);
  }, []);
  const onUpdateHandler = React.useCallback(() => {
    dispatch_ca(
      actions.updateCategories.updateCategoriesRequest({
        _id: record_cat._id,
        ...data,
      })
    );
    handleOk();
    setdata({ _id: "", name: "", begin: "", end: "" });
  }, [data, dispatch_ca, record_cat, handleOk]);
  function onSelectBegin(date, dateString) {
    data.begin = dateString;
    console.log(data.begin);
  }
  function onSelectEnd(date, dateString) {
    data.end = dateString;
    console.log(data.end);
  }
  return (
    <>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} lg={12} className="row-new-post">
          <Link onClick={viewModal}>Update</Link>
        </Grid>
      </Grid>
      <Modal
        open={ModalCatUpdate}
        onOk={handleOk}
        onCancel={handleOk}
        footer={null}
        className="container"
      >
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} lg={12} className="row-new-post">
            <center>Update category</center>
          </Grid>
          <Grid item xs={6} lg={6} className="row-new-post">
            <Typography>Begin date of the collection</Typography>
            <DatePicker
              showTime={{ format: "HH:mm:ss" }}
              format="HH:mm:ss DD-MM-YYYY"
              onChange={onSelectBegin}
            />
            <Input
              disabled
              placeholder={"CURRENT BEGIN DATE: " + defaultValue.begin}
            ></Input>
          </Grid>
          <Grid item xs={6} lg={6} className="row-new-post">
            <Typography>End date of the collection</Typography>
            <DatePicker
              showTime={{ format: "HH:mm:ss" }}
              format="HH:mm:ss DD-MM-YYYY"
              onChange={onSelectEnd}
            />
            <Input
              disabled
              placeholder={"CURRENT END DATE: " + defaultValue.end}
            ></Input>
          </Grid>
          <Grid item xs={12} lg={12} className="row-new-post">
            <Typography>Write the name of the category</Typography>
            <Input
              allowClear
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
              placeholder={"CURRENT NAME: " + defaultValue.name}
              size="large"
              value={data.name}
              onChange={(e) => setdata({ ...data, name: e.target.value })}
              required
            />
            <Typography>Write the description for the collection</Typography>
            <TextArea
              allowClear
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
              placeholder={"CURRENT DESCRIBE: " + defaultValue.description}
              size="large"
              value={data.description}
              onChange={(e) =>
                setdata({ ...data, description: e.target.value })
              }
              required
            />
            <Button type="primary" block onClick={onUpdateHandler}>
              Update
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}
