import React, { Fragment } from 'react';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { NavBar } from 'app/components/navbar';
import { Footer } from 'app/components/footer';
import { PageWrapper } from 'app/components/page-wrapper';

const listData: any = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `Blog ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Kinh nghiệm tìm phòng trọ: Sinh viên nên tìm phòng trọ qua kênh nào',
    content:
      'Thị trường phòng trọ phát triển, các bạn sinh viên sẽ có thể dễ dàng tìm phòng hơn với vô vàng kênh tìm phòng. Tuy nhiên, không phải kênh tìm phòng nào cũng tốt, vậy hãy cùng Ohana tìm hiểu xem đâu là những kênh tìm phòng hiệu quả mà các bạn sinh viên có thể hướng đến nhé.',
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const BlogPage: React.FC<any> = () => {
  return (
    <Fragment>
      <NavBar />
      <PageWrapper>
        <List
          itemLayout="vertical"
          className="mt-50"
          size="large"
          pagination={{
            onChange: (page) => {},
            pageSize: 6,
          }}
          dataSource={listData}
          // footer={
          //   <div>
          //     <b>ant design</b> footer part
          //   </div>
          // }
          renderItem={(item: any) => (
            <List.Item
              key={item.title}
              className="cursor-pointer"
              actions={[
                <IconText
                  icon={StarOutlined}
                  text="156"
                  key="list-vertical-star-o"
                />,
                <IconText
                  icon={LikeOutlined}
                  text="156"
                  key="list-vertical-like-o"
                />,
                <IconText
                  icon={MessageOutlined}
                  text="2"
                  key="list-vertical-message"
                />,
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </PageWrapper>
      <Footer />
    </Fragment>
  );
};
