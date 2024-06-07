import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navigation.css';
import logo from "../assets/logo.png";

// the logo used for the import is taken from Google. Copyrights unknown - should change to useable logo before publishing.

function Navigation({ user }) {
  return (
    <Navbar expand="lg" className="navigation">
      <Container>
        <style>

        </style>
        
<Navbar.Brand href="/" style={{ width: '150px', padding: 0}} className="navBrand"><img src={logo} className="img-fluid" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto mb-2 mb-lg-0">
            <Nav.Link href="/about">Our Story</Nav.Link>
            <Nav.Link href="/mission">Mission</Nav.Link>
            <Nav.Link href="/vision">Vision</Nav.Link>
            <Nav.Link href="/news">Updates</Nav.Link>
            <Nav.Link href="/donate">Partner</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Navigation;