import React from "react";
import NavigationComponent from "./Components/Navigations/nav_bar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movies from "./Pages/movies";
import CancelTicket from "./Pages/cancel_ticket";
import SetSeatLayout from "./Components/SeatLayouts/set_seat_layout";
import NormalLoginForm from "./Components/Authentication/login";
import NormalSignUpForm from "./Components/Authentication/register";

import "./Styles/index.css";

function App() {
  return (
    <Router>
      <NavigationComponent />
      <Routes>
       <Route path="/login" element={<NormalLoginForm />} />
       <Route path="/signup" element={<NormalSignUpForm />} />
        <Route path="/" element={<Movies />} />
        <Route path="/cancelticket" element={<CancelTicket />} />
        <Route path="/:id" element={<SetSeatLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
