import { useEffect, useState } from "react";
import ShowSeats from "./show_seats";
import { useLocation, useParams } from "react-router-dom";
import { Col, Row, Stack } from "react-bootstrap";
import { Button, Input, Form, InputNumber } from "antd";
import CurrencyFormat from "../Utils/currency_format";
import NumericInput from "../Utils/numeric_input";
import validateNumber from "../Utils/validateNumber";
import NavigationComponent from "../Navigations/nav_bar";
import "../../Styles/reserve.css";

const tips = "You will receive a 20% discount for senior citizen";

function SetSeatLayout() {
    const location = useLocation();
    const { data } = location.state;
    const [cell, setCell] = useState([]);
    const [hasSeats, setHasSeats] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [numSenior, setNumSenior] = useState("");
    const [validationData, setValidationData] = useState({});
    const [seatArray, setSeatArray] = useState([]);
    const [ticketsList, setTicketsList] = useState([]);
    const ticketPrice = 500;
    const discount = 1 - 0.2;
    const img_300 = "https://image.tmdb.org/t/p/w300";

    const [seats, setSeats] = useState(() =>
        Array(8)
            .fill(0)
            .map(() => Array(5).fill(false))
    );

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

    const handleChange = (num) => {
        setNumSenior(num);
    };

    const handleAddTicket = async () => {
        const ticketData = ticketsList[ticketsList.length - 1];
        // console.log(parseInt(ticketData.ticketNumber) + 1);
        try {
            const requestBody = {
                ticketNumber: parseInt(ticketData.ticketNumber) + 1,
                movieId: data._id,
                // movieId: data.id,
                seats: cell,
                numSenior: parseInt(numSenior),
            };

            const response = await fetch(
                "http://localhost:5000/api/tickets/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add ticket");
            }

            const addedTicket = await response.json();
            ticketsList.push(addedTicket);
            console.log("Ticket added:", addedTicket);
        } catch (error) {
            console.error("Error adding ticket:", error);
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
            if (numSen > 0 && numSen <= numSeats) {
                const discountedPrice = numSen * ticketPrice * discount;
                const regularPrice = (numSeats - numSen) * ticketPrice;
                setTotalPrice(discountedPrice + regularPrice);
            } else {
                const regularPrice = numSeats * ticketPrice;
                setTotalPrice(regularPrice);
            }
        }
        setValidationData({ ...validateNumber(numSeats, numSen), numSen });
    }, [cell, numSenior]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/tickets/all"
                );

                const ticket = await response.json();
                setTicketsList(ticket);

                const rows = "ABCDE";

                for (const item of ticket) {
                    if (item.movieId === data._id) {
                        // console.log(item);
                        for (const item2 of item.seats) {
                            if (!seatArray.includes(item2)) {
                                // seatArray.push(item2);
                                const col = rows.indexOf(item2[0]);
                                const row = parseInt(item2.slice(1)) - 1;
                                if (row >= 0 && row < 8 && col >= 0 && col < 5) {
                                    const updatedSeats = [...seats];
                                    updatedSeats[row][col] = true;
                                    setSeats(updatedSeats);
                                }
                            }
                        }
                    }
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };


        fetchData();
    }, []);

    // console.log(seatArray);

    return (
        <div className="seats-layout-container">
            <NavigationComponent />
            <Row>
                <Col md={4} className="movie-details">
                    <img
                        className="movie-details-poster"
                        alt="example"
                        src={data.image}
                    />
                    <div className="movie-details-poster-fade" />
                </Col>
                <Col md={4} className="seat-details">
                    <Stack className="align-items-center justify-content-center text-center">
                        <ShowSeats seatData={seats} rowColData={updateSeat} />
                        <ShowSeats seatData={seats} arrayData={setNewSeatsArray} />
                    </Stack>
                </Col>
                <Col md={4} className="ticket-details">
                    <div className="ticket-details-inner-container">
                        <h3 className="ticket-details-title">
                            Booking Information
                        </h3>
                        <div className="reserved-seats-list">
                            <h4>Seats: </h4>
                            <div>
                                {hasSeats ? (
                                    cell.map((rowCol, index) => (
                                        <p
                                            className="reserved-seats-text"
                                            key={index}
                                        >
                                            {rowCol}
                                            {index === cell.length - 1
                                                ? ""
                                                : ","}
                                        </p>
                                    ))
                                ) : (
                                    <p className="reserved-seats-text-default">
                                        please select your seats
                                    </p>
                                )}
                            </div>
                            <div>
                                <h4 className="num-senior-label">
                                    Number of Seniors:
                                </h4>
                                <Form.Item
                                    validateStatus={
                                        validationData.validateStatus
                                    }
                                    help={
                                        validationData.validateStatus ===
                                        "error"
                                            ? validationData.errorMsg
                                            : tips
                                    }
                                >
                                    <NumericInput
                                        disabled={hasSeats ? false : true}
                                        value={numSenior}
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                                <h4>Total Cost:</h4>
                                <h5 className="ticket-total-cost">
                                    Php {CurrencyFormat(totalPrice)}
                                </h5>
                            </div>
                        </div>
                        <Button
                            className="ticket-book-button"
                            onClick={handleAddTicket}
                        >
                            Book Ticket{" "}
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default SetSeatLayout;
