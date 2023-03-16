import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  categoriesLoading$,
  categoriesState$,
  modalState$,
} from "../../../redux/seclectors";
import * as actions from "../../../redux/actions";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Space, Table, Button, Modal, Input, DatePicker, Typography, Alert } from "antd";
import LoadingBox from "../../../component/LoadingBox/LoadingBox";
import Category from "./category";
import moment from "moment";

const { TextArea } = Input;
export default function CategoryManage() {


  const dispatch_ca = useDispatch()
  const categories = useSelector(categoriesState$)
  const loading = useSelector(categoriesLoading$)

  const [ModalcatOpen, setModalcatOpen] = useState(false);
  const [cat_data, setcat_data] = React.useState({
    name: "",
    description: "",
    begin: "",
    end: "",
  });
  const category = categories?.map((category) => ({
    key: category._id,
    name: category.name,

    description: category.description,
    begindate: category.begin,
    enddate: category.end
  })); 
  const deletedepartHandler = React.useCallback((record_cat) => {
    dispatch_ca(actions.deleteCategories.deleteCategoriesRequest(record_cat._id))
  }, [dispatch_ca])
  const disabledPassDates = React.useCallback((current) => {
    return current && current < moment().endOf("day");
  }, [])
  const columns = [
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
      width: "10%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "15%",
    },
    {
      title: "Begin date",
      dataIndex: "begindate",
      key: "begin",
      type:String,
      width: "15%",
    },
    {
      title: "End date",
      dataIndex: "enddate",
      key: "end",
      width: "15%",
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record_cat) => (
        <Space size="middle">
          <Category key={record_cat._id} record_cat={record_cat} ></Category>
          <Link onClick={() => deletedepartHandler(record_cat)}>Delete</Link>
        </Space>
      ),
    },
  ];
  const viewModal = React.useCallback(() => {

    setModalcatOpen(true);
  }, [])
  const handleclose = React.useCallback(() => {
    setModalcatOpen(false);
  }, []);
  const onSubmit = React.useCallback(() => {
    console.log(cat_data);
    dispatch_ca(actions.createCategories.createCategoriesRequest(cat_data));
    handleclose();
  }, [cat_data, dispatch_ca, handleclose]);
  const checkToCate = () => {
    return cat_data.name === "";
  };
  function onSelectBegin(date, dateString) {
    cat_data.begin= dateString;
    console.log(cat_data.begin);
  }
  function onSelectEnd(date, dateString) {
    cat_data.end= dateString;
    console.log(cat_data.end);
  }
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={2} sm={2} />
      <Grid item xs={10} sm={10}>

        <Button type="primary" onClick={viewModal}> Add new category</Button>
        <Modal open={ModalcatOpen}
          onOk={handleclose}
          onCancel={handleclose}
          footer={null}
          className="container"
        >
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} lg={12} className="row-new-post">
              <center>Create new category</center>
            </Grid>
            <Grid item xs={6} lg={6} className="row-new-post">
              <Typography>Begin date of the collection</Typography>
              <DatePicker showTime={{ format: 'HH:mm:ss' }} format='HH:mm:ss DD-MM-YYYY' onChange={onSelectBegin} />
            </Grid>
            <Grid item xs={6} lg={6} className="row-new-post">
              <Typography>End date of the collection</Typography>
              <DatePicker showTime={{ format: 'HH:mm:ss' }} format='HH:mm:ss DD-MM-YYYY' onChange={onSelectEnd} />
            </Grid>
            <Grid item xs={12} lg={12} className="row-new-post">
              <Typography>Write the name of the category</Typography>
              <Input
                allowClear
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
                placeholder='Name of category'
                size="large"
                value={cat_data.name}
                onChange={(e) =>
                  setcat_data({ ...cat_data, name: e.target.value })
                }
                required
              />
              <Typography>Write the description for the collection</Typography>
              <TextArea
                allowClear
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}

                placeholder='Describe your category'
                size="large"
                value={cat_data.description}
                onChange={(e) =>
                  setcat_data({ ...cat_data, description: e.target.value })
                }
                required
              />
              <Button
                disabled={checkToCate()}
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
          <Table columns={columns} dataSource={category} />
        )}
      </Grid>
    </Grid>
  );
}
