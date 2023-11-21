import { Col, Stack } from "react-bootstrap";
import { useNavigate  } from 'react-router-dom';

function MovieCard({movieDetails}) {
    const navigate = useNavigate ();

  const handleCardClick = () => {
    navigate(`/${movieDetails.id}`, { state: { data: movieDetails } });
  };

  return (
    <Col className="d-flex justify-content-center" md={3} onClick={handleCardClick}>
      <Stack className="movie-card">
        <h1>{movieDetails.title}</h1>
        <p>{movieDetails.start}</p>
      </Stack>
    </Col>
  );
}

export default MovieCard;
