import React from "react";
// import NavigationComponent from "./Components/Navigations/nav_bar";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Movies from "./Pages/movies";
import CancelTicket from "./Pages/cancel_ticket";
import SetSeatLayout from "./Components/SeatLayouts/set_seat_layout";
import NormalLoginForm from "./Components/Authentication/login";
import NormalSignUpForm from "./Components/Authentication/register";
import NavigationComponent from "./Components/Navigations/nav_bar";
import "./Styles/main.css"

function App() {
  return (
      <Router>
          {/* <NavigationComponent /> */}
          <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<NormalLoginForm />} />
              <Route path="/signup" element={<NormalSignUpForm />} />
              <Route path="/main" element={<Movies />} />
              <Route path="/cancelticket" element={<CancelTicket />} />
              <Route path="/:id" element={<SetSeatLayout />} />
          </Routes>
      </Router>
  );
}

export default App;
