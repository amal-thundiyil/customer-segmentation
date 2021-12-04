import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" className="shadow">
      <Container>
        <Navbar.Brand href="/">
          <img src="#" width="100" alt="logo" className="d-inline-block mb-3" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav>
            <NavDropdown title="Dropdown" id="nav-dropdown">
              <NavDropdown.Item href="#">SubOption1</NavDropdown.Item>
              <NavDropdown.Item href="#">SubOption2</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/Option1" className="nav-text">
              Option1
            </Nav.Link>
            <Nav.Link href="/Option2" className="nav-text">
              Option2
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
