import { Stack } from "react-bootstrap";
import "../../Styles/seatsLayout.css";
import SeatID from "./seatID";

function ShowSeats({ seatData, rowColData }) {
  
const toggleReservation = (row, col) => {
  const rowCol = { row: row, col: col };
  
  const getColumnID = (col) => {
    return String.fromCharCode(65 + col);
  };

  const columnID = getColumnID(col);
  const rowColDataObj = {rowCol, id: `${columnID}${row+1}` };

  rowColData(rowColDataObj);
    // const newSeats = [...seatData];
    // newSeats[row][col] = !newSeats[row][col];
    // updateData(newSeats);
  };

  return (
    <Stack className="d-flex align-items-center justify-content-center text-center">
      <h2>================</h2>
      <div className="seat-grid">
        {seatData.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((isReserved, colIndex) => (
              <div
                key={colIndex}
                className={`seat ${isReserved ? "reserved" : "available"}`}
                onClick={() => toggleReservation(rowIndex, colIndex)}
              >
                {/* {isReserved ? (
                  <i className="far fa-user"></i>
                ) : (
                  <i className="fas fa-user"></i>
                )} */}
                <SeatID seatData={{ row: rowIndex+1, col: colIndex}} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Stack>
  );
}

export default ShowSeats;
