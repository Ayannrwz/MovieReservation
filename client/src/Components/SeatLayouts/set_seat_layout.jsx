import { useEffect, useState } from "react";
import ShowSeats from "./show_seats";
import { useLocation, useParams } from "react-router-dom";
import { Col, Row, Stack } from "react-bootstrap";
import { Button, Input, Form, InputNumber } from "antd";
import CurrencyFormat from "../Utils/currency_format";
import NumericInput from "../Utils/numeric_input";

const validatePrimeNumber = (numSeats, number) => {

  if (numSeats >= number) {
    return {
      validateStatus: "success",
      errorMsg: null,
    };
  }

  if (!number) {
    return {
      validateStatus: "success",
      errorMsg: null,
    };
  }

  return {
    validateStatus: "error",
    errorMsg: `number of seniors exceeds the number of seats (${numSeats})`,
  };
};

const tips = "You will receive a 20% discount for each senior citizen";

function SetSeatLayout() {
  // const { id } = useParams();
  const location = useLocation();
  const { data } = location.state;
  const [cell, setCell] = useState([]);
  const [hasSeats, setHasSeats] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numSenior, setNumSenior] = useState("");
  const [validationData, setValidationData] = useState({});
  const ticketPrice = 500;
  const discount = 1 - 0.2;

  const [seats, setSeats] = useState(() =>
    Array(8)
      .fill(0)
      .map(() => Array(5).fill(false))
  );

  const img_300 = "https://image.tmdb.org/t/p/w300";

  const updateSeat = (data) => {
    const seatsData = [...seats];
    seatsData[data.rowCol.row][data.rowCol.col] =
      !seatsData[data.rowCol.row][data.rowCol.col];
    const existingIndex = cell.findIndex((item) => item === data.id);
    if (existingIndex !== -1) {
      const updatedCell = [...cell];
      updatedCell.splice(existingIndex, 1);
      setCell(updatedCell);
    } else {
      setCell([...cell, data.id]);
    }

    setSeats(seatsData);
  };

  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      return setNumSenior(inputValue);
    }
  };

  useEffect(() => {
    const numSen = parseInt(numSenior);
    const numSeats = cell.length;
    setTotalPrice(0);
    if (numSeats === 0) {
      setHasSeats(false);
    } else {
      setHasSeats(true);
      if(numSen>0 && numSen<=numSeats){
        const discountedPrice = numSen * ticketPrice * discount;
        const regularPrice = (numSeats-numSen) * ticketPrice;
        setTotalPrice(discountedPrice+regularPrice);
      }else{
        const regularPrice = numSeats * ticketPrice;
        setTotalPrice(regularPrice);
      }
    }
    setValidationData({ ...validatePrimeNumber(numSeats, numSen), numSen });
  }, [cell, numSenior]);

  return (
    <div className="seats-layout-container">
      <Row>
        <Col md={3}>
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
        <Col md={5}>
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
              <Form.Item
                validateStatus={validationData.validateStatus}
                help={validationData.errorMsg || tips}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  disabled={cell.length <= 0 ? true : false}
                  value={numSenior}
                  onChange={handleChange}
                />
              </Form.Item>
              <h4>Total Price</h4>
              <h5>Php. {CurrencyFormat(totalPrice)}</h5>
            </div>
            <Button block>Checkout</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default SetSeatLayout;
