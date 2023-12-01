import { Stack } from "react-bootstrap";
import SeatID from "./seatID";
import { useState, useEffect } from "react";

function ShowSeats({ seatData, rowColData }) {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleReservation = (row, col, isReserved) => {
        if (!isReserved) {
            const seat = { row, col };
            const seatIndex = selectedSeats.findIndex(
                (selected) => selected.row === row && selected.col === col
            );

            const rowCol = { row: row, col: col };

            const getColumnID = (col) => {
                return String.fromCharCode(65 + col);
            };

            const columnID = getColumnID(col);
            const rowColDataObj = { rowCol, id: `${columnID}${row + 1}` };
            console.log(rowColDataObj);
            rowColData(rowColDataObj);

            if (seatIndex > -1) {
                const updatedSelectedSeats = [...selectedSeats];
                updatedSelectedSeats.splice(seatIndex, 1);
                setSelectedSeats(updatedSelectedSeats);
            } else {
                setSelectedSeats([...selectedSeats, seat]);
            }
        }
    };

    return (
        <Stack className="d-flex align-items-center justify-content-center text-center">
            <div className="seat-grid">
                {seatData.map((row, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                        {row.map((isReserved, colIndex) => (
                            <div
                                key={colIndex}
                                className={`seat ${
                                    isReserved
                                        ? "reserved"
                                        : selectedSeats.some(
                                              (selected) =>
                                                  selected.row === rowIndex &&
                                                  selected.col === colIndex
                                          )
                                        ? "selected"
                                        : "available"
                                }`}
                                onClick={() =>
                                    toggleReservation(
                                        rowIndex,
                                        colIndex,
                                        isReserved
                                    )
                                }
                            >
                                <SeatID
                                    seatData={{
                                        row: rowIndex + 1,
                                        col: colIndex,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </Stack>
    );
}

export default ShowSeats;
