import React from "react";
import { useNavigate  } from 'react-router-dom';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";

import "../../Styles/index.css";

const { Meta } = Card;

function MovieCard({movieDetails}) {
  const navigate = useNavigate();
  const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";
  const img_300 = "https://image.tmdb.org/t/p/w300";

  const handleCardClick = () => {
    navigate(`/${movieDetails.id}`, { state: { data: movieDetails } });
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
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
      id="card"
    >
      <Meta
        id="card-information"
        title={movieDetails.title ? movieDetails.title : movieDetails.name}
        description={movieDetails.overview}
      />
    </Card>
  );
}

export default MovieCard;
