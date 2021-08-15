import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Form, Navbar, Nav } from "react-bootstrap";

const NavigationBar = () => {
  const [link, setLink] = useState<string>("");
  const [buttonStatus, setButtonStatus] = useState<boolean>(false);
  const history = useHistory();

  const changeLink = (newLink: string) => {
    setLink(newLink);
    setButtonStatus(newLink !== "");
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeLink(e.target.value);
  };

  const handleSubmit = () => {
    history.push(`/${link}`);
    changeLink("");
  };

  return (
    <Navbar bg="white" expand="lg" className="border-bottom mb-4">
      <Container>
        <Navbar.Brand href="/">
          <i>safebin</i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="https://github.com/malav-mehta/safebin">
              Source
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            <Form.Group className="me-lg-2 mb-2 mb-lg-0">
              <Form.Control
                type="text"
                placeholder="paste code"
                style={{
                  fontFamily: "monospace",
                }}
                onChange={handleLinkChange}
              />
            </Form.Group>
            <Button
              className="me-lg-2 mb-2 mb-lg-0"
              variant="warning"
              disabled={!buttonStatus}
              onClick={handleSubmit}
            >
              View Paste
            </Button>
            <Button
              className="mb-2 mb-lg-0"
              onClick={() => {
                history.push("/");
              }}
            >
              New Paste
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
