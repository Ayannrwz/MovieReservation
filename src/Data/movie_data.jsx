import { useState } from "react";

const moviesData = [
  {
    id: 1,
    title: "Movie 1",
    cinema: 1,
    duration: 120,
    date: "12-10-2023",
    start: "01:00",
  },
  {
    id: 2,
    title: "Movie 2",
    cinema: 2,
    duration: 100,
    date: "12-10-2023",
    start: "01:00",
  },
  {
    id: 3,
    title: "Movie 3",
    cinema: 3,
    duration: 110,
    date: "12-10-2023",
    start: "01:00",
  },
  {
    id: 4,
    title: "Movie 4",
    cinema: 4,
    duration: 130,
    date: "12-10-2023",
    start: "01:00",
  },
  {
    id: 5,
    title: "Movie 5",
    cinema: 1,
    duration: 130,
    date: "12-12-2023",
    start: "01:00",
  },
  {
    id: 6,
    title: "Movie 6",
    cinema: 2,
    duration: 100,
    date: "12-10-2023",
    start: "04:00",
  },
  {
    id: 7,
    title: "Movie 7",
    cinema: 3,
    duration: 120,
    date: "12-10-2023",
    start: "01:00",
  },
  {
    id: 8,
    title: "Movie 8",
    cinema: 4,
    duration: 100,
    date: "12-10-2023",
    start: "04:00",
  },
  {
    id: 9,
    title: "Movie 9",
    cinema: 1,
    duration: 100,
    date: "12-10-2023",
    start: "04:00",
  },
  {
    id: 10,
    title: "Movie 10",
    cinema: 2,
    duration: 120,
    date: "12-10-2023",
    start: "01:00",
  },
];

export const useMovies = () => {
  const [movies] = useState(moviesData);
  return movies;
};
