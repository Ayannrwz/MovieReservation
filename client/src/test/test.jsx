import React, { useState, useEffect } from 'react';

const TestList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/movies');
        // const response2 = await fetch('http://localhost:5000/tickets');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // const ticketData = await response2.json();
        const movieData = await response.json();
        // console.log(ticketData);
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <h2>{movie.movieTitle}</h2>
            <p>Cinema Number: {movie.cinemaNumber}</p>
            <p>{movie._id}</p>
            <p>{movie.startDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestList;
