import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Skeleton } from "antd";

const { Meta } = Card;

export const truncateOverview = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    }).format(date);

    return formattedDate;
};

export const convertDecimalHoursToHoursMinutes = (decimalHours) => {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return `${hours}h ${minutes}m`;
};

// Usage:
const result = truncateOverview("2023-12-16T05:00:00.000Z");
// console.log(result); // Output: December 16, 2023, 05:00:00

function MovieCard2({ movieDetails, isLoading }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";
    const img_300 = "https://image.tmdb.org/t/p/w300";

    const handleCardClick = () => {
        navigate(`/${movieDetails._id}`, { state: { data: movieDetails } });
    };

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);

    if (loading) {
        return (
            <>
                {/* <Switch checked={!loading} onChange={onChange} /> */}
                <Card loading={loading}>
                    <Meta
                        avatar={
                            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                        }
                        title="Card title"
                        description="This is the description"
                    />
                </Card>
                <Card
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <Skeleton loading={loading} avatar active>
                        <Meta
                            avatar={
                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
                            }
                            title="Card title"
                            description="This is the description"
                        />
                    </Skeleton>
                </Card>
            </>
        );
    }

    return (
        <Card
            onClick={handleCardClick}
            cover={
                <img
                    id="movie-image"
                    alt="example"
                    src={movieDetails.image ? movieDetails.image : unavailable}
                />
            }
            id="movie-card"
        >
            <Meta
                id="movie-card-information"
                title={movieDetails.movieTitle}
                description={
                    <div>
                        <p>{truncateOverview(movieDetails.startDate)}</p>
                        <p>
                            Duration:{" "}
                            {
                                convertDecimalHoursToHoursMinutes(movieDetails.duration)
                            }
                        </p>
                        <p>Cinema: {movieDetails.cinemaNumber}</p>
                        <p>{movieDetails.isPremiere ? "Premiere" : " "}</p>
                    </div>
                }
            />
        </Card>
    );
}

export default MovieCard2;
