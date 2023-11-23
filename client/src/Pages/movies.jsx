import { useEffect, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import { useMovies } from "../Data/movie_data";
import { DatePicker } from "antd";

import FormatDate from "../Components/Utils/data_format";
import MovieCard from "../Components/Card/movie_card";

import "../Styles/index.css";



function Movies() {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [movieList, setMovieList] = useState([]);
  const movie = useMovies();
  const [state, setState] = useState([]);

  const fetchTrending = async () => {
    const data = await fetch(`
https://api.themoviedb.org/3/trending/all/day?api_key=ccf711f2e7a3eadbcc4f8d010b633d4e`);
    const dataJ = await data.json();
    setState(dataJ.results);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const handleDateChange = (date) => {
    const filteredList = movie.filter((movie) =>
      movie.date.toLowerCase().includes(FormatDate(date))
    );

    setMovieList(filteredList);
    setSelectedDate(date);
  };

  useEffect(() => {
    setMovieList(movie);
  }, []);

  console.log(state);

  return (
    <Stack className="stack-container">
      <div className="filter-section">
        <Row>
          <Col>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="movie-date-picker"
            />
          </Col>
        </Row>
      </div>
      <div className="movies-section">
        <Row className="justify-content-center">
          {state.length == 0 ? (
            <h1>Nothing to display</h1>
          ) : (
            state.map((movie, index) => (
              <MovieCard key={index} movieDetails={movie} />
            ))
          )}
        </Row>
      </div>
    </Stack>
  );
}

export default Movies;
