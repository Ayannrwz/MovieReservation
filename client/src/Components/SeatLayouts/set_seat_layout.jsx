import { useEffect, useState } from "react";
import ShowSeats from "./show_seats";
import { useLocation, useParams } from "react-router-dom";
import { Col, Row, Stack } from "react-bootstrap";
import { Button, Input, Form, InputNumber } from "antd";
import NumericInput from "../Utils/numeric_input";
import CurrencyFormat from "../Utils/currency_format";

const validatePrimeNumber = (number) => {
  if (number === 11) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: null,
  };
};
const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 12,
  },
};

const tips =
  'You will receive a 20% discount for senior citizen';

import "../../Styles/reserve.css"

function SetSeatLayout() {
  // const { id } = useParams();
  const location = useLocation();
  const { data } = location.state;
  const [cell, setCell] = useState([]);
  const [hasSeats, setHasSeats] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numSenior, setNumSenior] = useState("");
  const [isInputVAlid, setIsInputValid] = useState(true);

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

  const onNumberChange = (value) => {
    setNumSenior({
      ...validatePrimeNumber(value),
      value,
    });
  };

  const handleNumSeniorChange = (e) => {
    const val = e.target.value;
    console.log(cell.length);
    if (cell.length !== 0) {
      if (!isNaN(val) && val >= 0) {
        return setNumSenior(val);
      }
      // if (val > cell.length) {
      //   setNumSenior("");
      //   return setIsInputValid(false);
      // }
      return setNumSenior("");
    }
  };

  useEffect(() => {
    if (cell.length === 0) {
      setHasSeats(false);
      setTotalPrice(0);
    } else {
      setHasSeats(true);
      const num = parseInt(numSenior);
      if (num <= cell.length) {
        const price = cell.length * 500;
        const discountedPrice = price * 0.2 * num;
        setTotalPrice(discountedPrice);
        setIsInputValid(true);
      } else {
        setTotalPrice(cell.length * 500);
        setIsInputValid(false);
      }
    }
  }, [cell, numSenior]);

  return (
    <div className="seats-layout-container">
      <Row>
        <Col md={2}>
          <img alt="example" src={`${img_300}/${data.poster_path}`} />
          <h2>{data.title ? data.title : data.name}</h2>
          <p>Overview: {data.overview}</p>
          <p>First Air Date: {data.first_air_date}</p>
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
                {hasSeats ? (
                cell.map((rowCol, index) => (
                    <p className="reserved-seats-text" key={index}>
                    {rowCol}
                    {index === cell.length - 1 ? "" : ","}
                  </p>
                  ))
              ) : (
                <p>please select your seats</p>
              )}
            </div>
            <div>
              {/* {isInputVAlid ? "" : <p>Input Invalid</p>} */}
              <Form.Item
        {...formItemLayout}
        validateStatus={numSenior.validateStatus}
        help={numSenior.errorMsg || tips}
      >
        <InputNumber value={numSenior} onChange={onNumberChange} />
      </Form.Item>
              {/* <input
                type="text"
                value={numSenior}
                onChange={handleNumSeniorChange}
              /> */}
              {/* <NumericInput
      style={{
        width: 120,
      }}
      value={numSenior}
      onChange={setNumSenior}
    /> */}
              <h4>Total Price</h4>
              <h5>Php. {CurrencyFormat(totalPrice)}</h5>
              </div>
            </div>
            <Button block>Checkout</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default SetSeatLayout;
