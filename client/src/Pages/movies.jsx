import { useEffect, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import { DatePicker, Spin } from "antd";
import MovieCard from "../Components/Card/movie_card";
import NavigationComponent from "../Components/Navigations/nav_bar";
import { format } from 'date-fns';

import parallaxBackground from "../assets/parallax-movie-background.png"
import parallaxForeground from "../assets/parallax-movie-foreground.png"

import "../Styles/movies.css";

function Movies() {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [movieList, setMovieList] = useState([]);
  const [state, setState] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  const fetchTrending = async () => {
    const data = await fetch(`
https://api.themoviedb.org/3/trending/all/day?api_key=ccf711f2e7a3eadbcc4f8d010b633d4e`);
    const dataJ = await data.json();
    // console.log(dataJ.results);
    setState(dataJ.results);
    setMovieList(dataJ.results);
    setShowLoading(false);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const handleDateChange = (date) => {
    const selectedDate = date ? new Date(date) : null;
    const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
  
    if (!formattedDate) {
      setMovieList(state);
      setSelectedDate(null);
      return;
    }
  
    const filteredList = state.filter((movie) => {
      return movie.release_date && movie.release_date.includes(formattedDate);
    });

    setMovieList(filteredList);
    setSelectedDate(date);
    // setShowLoading(false);
  };

  return (
    <div class="main-wrapper">
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
            {showLoading ? (<Spin tip="Loading" size="large"></Spin>) : (movieList.length == 0 ? (
              <h2>No data Available</h2>
            ) : (
              movieList.map((movie, index) => (
                <MovieCard key={index} movieDetails={movie} />
              ))
            ))}
          </Row>
        </div>
      </Stack>
    </div>
  );
}

export default Movies;
