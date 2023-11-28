import React from 'react';
import { Table, Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { useMovies } from '../Data/movie_data';
import "../../src/Styles/cancel.css"
const { Search } = Input;

const CancelTicket = () => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Cinema',
      dataIndex: 'cinema',
      key: 'cinema',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Start',
      dataIndex: 'start',
      key: 'start',
    },
  ];

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 20,
        color: '#1677ff',
      }}
    />
  );

  return (
    <div>
      <h1 className='title'>Cancel Reservation</h1>

<div className="cancel-container">
  <h3>Input ticket number:</h3>
    <Space direction="vertical">
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />

      {/* <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        suffix={suffix}
        onSearch={onSearch}
      /> */}
    </Space>
    </div>
    </div>
  
  );
};

export default CancelTicket;
