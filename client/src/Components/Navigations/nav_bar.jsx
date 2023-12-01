import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React from "react";
import { Navbar, Container, Nav, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationComponent() {
  const menu = (
      <Menu>
          <Menu.Item key="1">
              <Link to="/login">Logout</Link>
          </Menu.Item>
          <Menu.Item key="2">
              <Link to="/signup">Register</Link>
          </Menu.Item>
      </Menu>
  );

  return (
      <Navbar id="nav-bar">
          <Container>
              <Col>
                  <Navbar.Brand href="#home">{/* Logo */}</Navbar.Brand>
              </Col>

              <Col>
                  <Nav className="text-center justify-content-center">
                      <Nav.Link as={Link} to="/main" id="nav-text-link">
                          Movies
                      </Nav.Link>
                      <Nav.Link as={Link} to="/cancelticket" id="nav-text-link">
                          Cancel Reservation
                      </Nav.Link>
                  </Nav>
              </Col>

              <Col className="text-end">
                  <Dropdown overlay={menu} placement="bottomRight">
                      <a
                          className="ant-dropdown-link"
                          onClick={(e) => e.preventDefault()}
                      >
                          <EllipsisOutlined style={{ fontSize: 18 }} />
                      </a>
                  </Dropdown>
              </Col>
          </Container>
      </Navbar>
  );
}

export default NavigationComponent;
