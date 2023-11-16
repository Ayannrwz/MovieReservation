import React from "react";
import NavigationComponent from "./Components/nav_bar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movies from "./Pages/movies";
import CancelTicket from "./Pages/cancel_ticket";
import SetSeatLayout from "./Components/set_seat_layout";

function App() {
  return (
    <Router>
      <NavigationComponent />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/cancelticket" element={<CancelTicket />} />

        <Route path="/:id" element={<SetSeatLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
