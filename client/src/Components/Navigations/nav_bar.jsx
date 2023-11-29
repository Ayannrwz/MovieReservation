import React from "react";
import { Navbar, Container, Nav, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationComponent() {
  return (
    <Navbar id="nav-bar">
      <Container>
        <Col>
          <Navbar.Brand href="#home">
            {/* Logo */}
          </Navbar.Brand>
        </Col>

        <Col>
          <Nav className="text-center justify-content-center">
            <Nav.Link as={Link} to="/" id="nav-text-link">
              Movies
            </Nav.Link>
            <Nav.Link as={Link} to="/cancelticket" id="nav-text-link">
              Cancel Reservation
            </Nav.Link>
          </Nav>
        </Col>

        <Col className="text-end">
          <Navbar.Text>
            <Link to="/login">Username</Link>
          </Navbar.Text>
          {/* User Profile Picture */}
        </Col>
      </Container>
    </Navbar>
  );
}

export default NavigationComponent;
