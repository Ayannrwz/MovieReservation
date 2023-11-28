import { useState } from "react";
import ShowSeats from "./show_seats";
import { useLocation, useParams } from "react-router-dom";
import { Col, Row, Stack } from "react-bootstrap";

import "../../Styles/reserve.css"

function SetSeatLayout() {
  // const { id } = useParams();
  const location = useLocation();
  const { data } = location.state;
  const [cell, setCell] = useState([]);
  const [seats, setSeats] = useState(() =>
    Array(8)
      .fill(0)
      .map(() => Array(5).fill(false))
  );
  const img_300 = "https://image.tmdb.org/t/p/w300";

  const updateSeat = (data) => {
    // console.log(data);
    const seatsData = [...seats];
    seatsData[data.rowCol.row][data.rowCol.col] =
      !seatsData[data.rowCol.row][data.rowCol.col];
    const existingIndex = cell.findIndex((item) => item === data.id);
    // console.log(existingIndex);
    if (existingIndex !== -1) {
      const updatedCell = [...cell];
      updatedCell.splice(existingIndex, 1);
      setCell(updatedCell);
    } else {
      setCell([...cell, data.id]);
    }
    setSeats(seatsData);
  };

  // console.log(seats);
  // console.log(cell);

  return (
    <div className="seats-layout-container">
      <Row>
        <Col md={4} className="movie-details">
        <img
          className="movie-details-poster"
          alt="example"
          src={`${img_300}/${data.poster_path}`}
        />
        <div className="movie-details-poster-fade"></div>
        {/* <div className="movie-details-text-container">
          <h2>{data.title}</h2>
          <p>Duuration: {data.duration}</p>
          <p>Cinema: {data.cinema}</p>
          <p>Date: {data.date}</p>
          <p>Time Start: {data.start}</p>
        </div> */}
        </Col>
        <Col md={4} className="seat-details">
          <Stack className="align-items-center justify-content-center text-center">
            <ShowSeats seatData={seats} rowColData={updateSeat} />
          </Stack>
        </Col>
        <Col md={4} className="ticket-details">
          <div className="ticket-details-inner-container">
            <h3 className="ticket-details-title">Booking Information</h3>
            <div className="reserved-seats-list">
              <h4>Seats: </h4>
              <div>
                {cell.map((rowCol, index) => (
                  <p className="reserved-seats-text" key={index}>{rowCol}{index === cell.length - 1 ? "" : ","}</p>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default SetSeatLayout;
