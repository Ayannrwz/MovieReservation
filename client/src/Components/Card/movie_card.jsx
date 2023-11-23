import React, { useEffect, useState } from "react";
import { useNavigate  } from 'react-router-dom';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Skeleton } from "antd";

import "../../Styles/index.css";

const { Meta } = Card;

const truncateOverview = (overview, limit = 40) => {
  if (overview.length > limit) {
    return overview.substring(0, limit) + '... See more';
  }
  return overview;
}

function MovieCard({movieDetails, isLoading}) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";
  const img_300 = "https://image.tmdb.org/t/p/w300";

  const handleCardClick = () => {
    navigate(`/${movieDetails.id}`, { state: { data: movieDetails } });
  };

  useEffect(()=>{
    setLoading(isLoading);
  }, [isLoading])

  if(loading){
    return (
      <>
        {/* <Switch checked={!loading} onChange={onChange} /> */}
        <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
          <Meta
            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
            title="Card title"
            description="This is the description"
          />
        </Card>
        <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />}
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
        </Card>
      </>
    );
  };

  return (
    <Card
      onClick={handleCardClick}
      cover={
        <img
          alt="example"
          src={movieDetails.poster_path ? `${img_300}/${movieDetails.poster_path}` : unavailable}
        />
      }
      id="card"
    >
      <Meta
        id="card-information"
        title={movieDetails.title ? movieDetails.title : movieDetails.name}
        description={truncateOverview(movieDetails.overview)}
      />
    </Card>
  );
}

export default MovieCard;
