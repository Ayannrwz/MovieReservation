import { useState } from "react";
import ShowSeats from "./show_seats";
import { useLocation, useParams } from "react-router-dom";
import { Stack } from "react-bootstrap";

function SetSeatLayout() {
  const { id } = useParams();
  const location = useLocation();
  const { data } = location.state;
  const [seats, setSeats] = useState(() =>
    Array(8)
      .fill(0)
      .map(() => Array(5).fill(false))
  );

  const updateSeat = (data) => {
    setSeats(data);
  };

  return (
    <div className="align-items-center justify-content-center text-center">
      <Stack>
        <h2>{data.title}</h2>
        <ShowSeats seatData={seats} updateData={updateSeat} />
      </Stack>
    </div>
  );
}

export default SetSeatLayout;
