import { useEffect, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import { DatePicker, Spin } from "antd";
import MovieCard from "../Components/Card/movie_card";
import NavigationComponent from "../Components/Navigations/nav_bar";
import { format } from "date-fns";

import parallaxBackground from "../assets/parallax-movie-background.png";
import parallaxForeground from "../assets/parallax-movie-foreground.png";

import "../Styles/movies.css";
import MovieCard2 from "../Components/Card/movie_card_mongodb";

function Movies() {
    const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [movieList, setMovieList] = useState([]);
    const [state, setState] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/movies/all"
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const movieData = await response.json();

                const currentDate = new Date();
                // console.log(currentDate);
                const moviesStarted = movieData.filter((movie) => {
                    const startDate = new Date(movie.startDate);
                    // console.log(startDate);
                    return currentDate <= startDate;
                });

                setShowLoading(false);
                setState(movieData);
                setMovieList(movieData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDateChange = (date) => {
        const selectedDate = date ? new Date(date) : null;
        const formattedDate = selectedDate
            ? format(selectedDate, "yyyy-MM-dd")
            : null;

        if (!formattedDate) {
            setMovieList(state);
            setSelectedDate(null);
            return;
        }

        const filteredList = state.filter((movie) => {
            return movie.startDate && movie.startDate.includes(formattedDate);
        });

        setMovieList(filteredList);
        setSelectedDate(date);
    };

    return (
        <div className="main-wrapper">
            <NavigationComponent />
            <section className="parallax">
                <img
                    className="parallax-foreground"
                    src={parallaxForeground}
                    alt="parallax foreground"
                />
                <h2 id="app-title">Movie Reservation</h2>
                <img
                    className="parallax-background"
                    src={parallaxBackground}
                    alt="parallax background"
                />
            </section>

            <Stack className="stack-container">
                <div className="movie-datepicker-container">
                    <Row>
                        <Col>
                            <DatePicker
                                id="movie-datepicker"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                            />
                        </Col>
                    </Row>
                </div>
                <div className="movies-section">
                    <Row className="justify-content-center">
                        {showLoading ? (
                            <Spin tip="Loading" size="large"></Spin>
                        ) : movieList.length == 0 ? (
                            <h2 className="no-data-message text-center">No data Available</h2>
                        ) : (
                            movieList.map((movie, index) => (
                                // <MovieCard key={index} movieDetails={movie} />
                                <MovieCard2 key={index} movieDetails={movie} />
                            ))
                        )}
                    </Row>
                </div>
            </Stack>
        </div>
    );
}

export default Movies;
