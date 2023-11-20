import { useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { useMovies } from "../Data/movie_data";
import MovieCard from "../Components/movie_card";

function Movies() {
  const [selectedDate, setSelectedDate] = useState(null);
  const movies = useMovies();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Stack>
      <div className="filter-section text-center">
        <Row>
          <Col>
            <ReactDatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
            />
          </Col>
        </Row>
      </div>
      <div className="movies-section">
        <Row className="justify-content-center"> 
        {movies.map((movie, index) => (
            <MovieCard key={index} movieData={movie} />
        ))}
        </Row>
      </div>
    </Stack>
  );
}

export default Movies;
