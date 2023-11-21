import { useState } from "react";
import ShowSeats from "./show_seats";
import { useLocation, useParams } from "react-router-dom";
import { Col, Row, Stack } from "react-bootstrap";

function SetSeatLayout() {
  const { id } = useParams();
  const location = useLocation();
  const { data } = location.state;
  const [cell, setCell] = useState([]);
  const [seats, setSeats] = useState(() =>
    Array(8)
      .fill(0)
      .map(() => Array(5).fill(false))
  );

  const updateSeat = (data) => {
    const seatsData = [...seats];
    seatsData[data.rowCol.row][data.rowCol.col] = !seatsData[data.rowCol.row][data.rowCol.col];
    console.log(data);
    const existingIndex = cell.findIndex(item => item.row === data.rowCol.row && item.col === data.rowCol.col);
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

  return (
    <div className="seats-layout-container">
      <Row>
        <Col md={3}>
          <h2>{data.title}</h2>
          <p>Duuration: {data.duration}</p>
          <p>Cinema: {data.cinema}</p>
          <p>Date: {data.date}</p>
          <p>Time Start: {data.start}</p>
        </Col>
        <Col md={4}>
          <Stack className="align-items-center justify-content-center text-center">
            <ShowSeats seatData={seats} rowColData={updateSeat} />
          </Stack>
        </Col>
        <Col md={5}>
          <div>
            <h4>Booking Information</h4>
            {cell.map((rowCol, index) => (
              <p key={index}>
                {rowCol}:{rowCol}
              </p>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default SetSeatLayout;
