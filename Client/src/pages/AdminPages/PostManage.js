import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { Helmet } from "react-helmet-async";
import { allPostsState$ } from "../../redux/seclectors/";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppstoreOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Tabs } from "antd";
import {
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import * as actions from "../../redux/actions";
export default function PostManage() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const posts = useSelector(allPostsState$);
  const filterPostsByStatus = (posts, status) =>
    posts
      ?.filter((post) => post.status === status)
      .map((post) => ({
        key: post._id,
        title: post.title,
        content: post.content,
        author: post.author.fullName,
        department: post.department,
        status: post.status,
        attachment: post.attachment,
      }));

  const data = posts?.map((post) => ({
    key: post._id,
    title: post.title,
    content: post.content,
    author: post.author.fullName,
    department: post.department,
    status: post.status,
    attachment: post.attachment,
  }));
  const dataPending = filterPostsByStatus(posts, "Pending");
  const dataAccept = filterPostsByStatus(posts, "Accepted");
  const dataReject = filterPostsByStatus(posts, "Rejected");
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.getAllPosts.getAllPostsRequest());
  }, [dispatch]);

  const updateAcceptHandler = React.useCallback(
    (record) => {
      if (
        window.confirm(
          "Are you sure to update status of this post to accepted?"
        )
      ) {
        try {
          dispatch(
            actions.updatePostAccept.updatePostAcceptRequest({
              _id: record.key,
            })
          );
          toast.success("Updated status successfully");
        } catch (err) {
          toast.error(getError(err));
        }
      }
    },
    [dispatch]
  );
  const updateRejectHandler = React.useCallback(
    (record) => {
      if (
        window.confirm(
          "Are you sure to update status of this post to rejected?"
        )
      ) {
        try {
          dispatch(
            actions.updatePostReject.updatePostRejectRequest({
              _id: record.key,
            })
          );
          toast.success("Updated status successfully");
        } catch (err) {
          toast.error(getError(err));
        }
      }
    },
    [dispatch]
  );
  const deleteHandler = React.useCallback(
    (record) => {
      if (window.confirm("Are you sure to delete this idea?")) {
        try {
          dispatch(
            actions.deletePostByAdmin.deletePostRequestByAdmin(record.key)
          );
          toast.success("Delete idea successfully");
        } catch (err) {
          toast.error(getError(err));
        }
      }
    },
    [dispatch]
  );
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "10%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: "30%",
    },
    {
      title: "Attachment",
      dataIndex: "attachment",
      key: "attachment",
      width: "10%",
      render: (_, record) => (
        <img
          style={{ width: "150px", height: "150px", borderRadius: 0 }}
          src={record.attachment}
          alt={record._id}
        />
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "10%",
      ...getColumnSearchProps("author"),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (_, record) => {
        let colorType = {
          Pending: "yellow",
          Accepted: "green",
          Rejected: "red",
        };
        let iconType = {
          Pending: <SyncOutlined spin />,
          Accepted: <CheckCircleOutlined />,
          Rejected: <CloseCircleOutlined />,
        };
        let color = colorType[record.status];
        let icon = iconType[record.status];
        return (
          <Tag icon={icon} color={color}>
            {record.status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      onCell: (_, record) => ({
        onClick: () => {
          // handle click action here
        },
      }),
      render: (_, record) => (
        <Space
          size="middle"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Button type="primary" onClick={() => updateAcceptHandler(record)}>
            Accept
          </Button>
          <Button type="primary" onClick={() => updateRejectHandler(record)}>
            Reject
          </Button>
          <Button type="primary" onClick={() => deleteHandler(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const [tableParams, setTableParams] = useState({
    pagination: {
      pageSize: 5,
    },
  });

  const tabs = [
    <Table
      pagination={tableParams.pagination}
      columns={columns}
      dataSource={data}
    />,
    <Table
      pagination={tableParams.pagination}
      columns={columns}
      dataSource={dataPending}
    />,
    <Table
      pagination={tableParams.pagination}
      columns={columns}
      dataSource={dataAccept}
    />,
    <Table
      pagination={tableParams.pagination}
      columns={columns}
      dataSource={dataReject}
    />,
  ];
  const labels = ["All", "Pending", "Accept", "Reject"];
  const icons = [
    <AppstoreOutlined />,
    <SyncOutlined spin />,
    <CheckCircleOutlined />,
    <CloseCircleOutlined />,
  ];
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={2} sm={2} />
      <Grid item xs={10} sm={10}>
        <Tabs
          tabPosition="right"
          items={new Array(4).fill(null).map((_, i) => {
            return {
              label: (
                <span>
                  {icons[i]}
                  {labels[i]}
                </span>
              ),
              key: i,
              children: tabs[i],
            };
          })}
        />
      </Grid>
    </Grid>
  );
}
