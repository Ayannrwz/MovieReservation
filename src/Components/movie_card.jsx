import { Col, Stack } from "react-bootstrap";
import { useNavigate  } from 'react-router-dom';

function MovieCard({ movieData }) {
    const navigate = useNavigate ();

  const handleCardClick = () => {
    navigate(`/${movieData.id}`, { state: { data: movieData } });
  };

  return (
    <Col md={3} onClick={handleCardClick}>
      <Stack className="movie-card">
        <h1>{movieData.title}</h1>
        <p>{movieData.start}</p>
      </Stack>
    </Col>
  );
}

export default MovieCard;
