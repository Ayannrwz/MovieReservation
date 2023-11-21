import { useEffect, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import { useMovies } from "../Data/movie_data";
import MovieCard from "../Components/movie_card";
import FormatDate from "../Components/data_format";
import { DatePicker } from "antd";

function Movies() {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [movieList, setMovieList] = useState([]);
  const movie = useMovies();

  const handleDateChange = (date) => {
    const filteredList = movie.filter((movie) =>
      movie.date.toLowerCase().includes(FormatDate(date))
    );

    // console.log(FormatDate(date));
    setMovieList(filteredList);
    setSelectedDate(date);
  };

  useEffect(() => {
    setMovieList(movie);
  }, []);

  return (
    <Stack>
      <div className="filter-section text-center">
        <Row>
          <Col>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
            />
          </Col>
        </Row>
      </div>
      <div className="movies-section">
        <Row className="justify-content-center">
          {movieList.length == 0 ? (
            <h1>Nothing to display</h1>
          ) : (
            movieList.map((movie, index) => (
              <MovieCard key={index} movieDetails={movie} />
            ))
          )}
        </Row>
      </div>
    </Stack>
  );
}

export default Movies;
