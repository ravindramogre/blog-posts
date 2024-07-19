import "./style.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, Breadcrumb, Descriptions, Card, Spin} from "antd";
const { Title } = Typography;

const BlogPostItem = () => {
  const { page, index, pagesize } = useParams();
  const [record, setRecord] = useState(null);

  let currentDate = new Date();
  let previousDate = new Date(currentDate.getTime() - 86400000);
  let year = previousDate.getFullYear();
  let month = ('0' + (previousDate.getMonth() + 1)).slice(-2);
  let day = ('0' + previousDate.getDate()).slice(-2);
  let formattedPreviousDate = `${year}-${month}-${day}`;
  const API_URL =
    `https://newsapi.org/v2/everything?q=tesla&from=${formattedPreviousDate}&sortBy=publishedAt&apiKey=bbed78df30a24e61a901b2924a4032c3`;

  useEffect(() => {
    const paginatedURL = `&page=${page}&pageSize=${pagesize}`;
    fetch(API_URL + paginatedURL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.articles) {
          setRecord(data?.articles[index]);
        }
      });
  }, []);

  if (!record){
    return <Spin fullscreen/>
  }
  return (
    <div className="post-detail-container">
      {/* <p data-testid="record">{record}</p> */}
      <Breadcrumb style={{ marginBottom: '16px' }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/">Posts</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{record?.title}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-page-header">
        <Title>{record?.title}</Title>
      </div>
      <div className="post-detail-content">
        <Card
          cover={<img alt="Post Cover" src={record?.urlToImage} />}
          bordered={false}
        >
          <Descriptions title="Description">
            <Descriptions.Item>{record?.description}</Descriptions.Item>
          </Descriptions>
          <Descriptions title="Content">
            <Descriptions.Item>{record?.content}</Descriptions.Item>
          </Descriptions>
          <span style={{fontSize: ".8rem", color: "gray"}}>author &#x2022; {record?.author}</span>
          <span style={{marginLeft: "2rem", fontSize: ".8rem", color: "gray"}}>published at &#x2022; {record?.publishedAt}</span>
        </Card>
      </div>
    </div>
  );
};

export default BlogPostItem;
