import { List, Table, Button, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const API_URL = "https://newsapi.org/v2/everything?q=tesla&from=2024-06-18&sortBy=publishedAt&apiKey=bbed78df30a24e61a901b2924a4032c3";
const BlogPostList = () => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const paginatedURL = `&page=${current}&pageSize=${pageSize}`;
    fetch(API_URL + paginatedURL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, [current, pageSize]);

  const dataSource = data?.articles;

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "30%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "40%",
    },
    {
      title: "Published At",
      dataIndex: "publishedAt",
      key: "publishedAt",
      width: "20%",
    },
    {
      title: "Actions",
      key: "actions",
      width: "20%",
      render: (text, record, index) => {
        return (
          <Link to={`/post/${current}/${pageSize}/${index}`}>
            <Button>
              <EyeOutlined />
            </Button>
          </Link>
        );
      },
    },
  ];
  if (!dataSource) {
    return <Spin fullscreen />;
  }

  return (
    <>
      {/* <p data-testid="datasource">{dataSource}</p> */}
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          total: data?.totalResults,
          current: current,
          pageSize: pageSize,
          pageSizeOptions: [10, 20, 40],
          onChange: (page, pageSize) => {
            setCurrent(page);
            setPageSize(pageSize);
          },
        }}
      />
    </>
  );
};

export default BlogPostList;
