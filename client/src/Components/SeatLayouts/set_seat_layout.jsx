import { useEffect, useState } from "react";
import ShowSeats from "./show_seats";
import { useLocation, useParams } from "react-router-dom";
import { Col, Row, Stack } from "react-bootstrap";
import { Button, Input } from "antd";

const currencyFormat = (number) => {
  if (typeof number !== "number") {
    return "Invalid Input";
  }

  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

function SetSeatLayout() {
  // const { id } = useParams();
  const location = useLocation();
  const { data } = location.state;
  const [cell, setCell] = useState([]);
  const [hasSeats, setHasSeats] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numSenior, setNumSenior] = useState(0);

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

  const handleNumSeniorChange = (e) => {
    const newValue = parseInt(e.target.value);

    if (!isNaN(newValue)) {
      setNumSenior(newValue);
    }
  };

  useEffect(() => {
    if (cell.length === 0) {
      setHasSeats(false);
      setTotalPrice(0);
    } else {
      setHasSeats(true);
      if (numSenior > 0) {
        const price = cell.length * 500
        const discountedPrice = price - 300 * numSenior;
        // console.log("discount");
        return setTotalPrice(discountedPrice);
      }
      return setTotalPrice(cell.length * 500);
    }
    // console.log(numSenior);
  }, [cell, numSenior]);

  // console.log(seats);
  // console.log(data);

  return (
    <div className="seats-layout-container">
      <Row>
        <Col md={4}>
          <img alt="example" src={`${img_300}/${data.poster_path}`} />
          <h2>{data.title ? data.title : data.name}</h2>
          <p>Overview: {data.overview}</p>
          <p>First Air Date: {data.first_air_date}</p>
        </Col>
        <Col md={4}>
          <Stack className="align-items-center justify-content-center text-center">
            <ShowSeats seatData={seats} rowColData={updateSeat} />
          </Stack>
        </Col>
        <Col md={4}>
          <div>
            <h4>Booking Information</h4>
            <div className="reserved-seats-list">
              <h4>Seats: </h4>
              {hasSeats ? (
                cell.map((rowCol, index) => (
                  <p key={index}>
                    {rowCol}
                    {index === cell.length - 1 ? "" : ","}
                  </p>
                ))
              ) : (
                <p>please select your seats</p>
              )}
            </div>
            <div>
              {/* <NumericInput
                style={{
                  width: 120,
                }}
                value={numSenior}
                onChange={setNumSenior}
              /> */}
              <input 
              type="number" 
              value={numSenior}
              onChange={handleNumSeniorChange}  
              />
              <h4>Total Price</h4>
              <h5>Php. {currencyFormat(totalPrice)}</h5>
            </div>
            <Button block>Checkout</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default SetSeatLayout;
