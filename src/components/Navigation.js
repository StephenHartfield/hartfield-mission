import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import './Navigation.css';
import logo from "../assets/Hartfield Kenya.png";

// the logo used for the import is taken from Google. Copyrights unknown - should change to useable logo before publishing.

function Navigation({ user }) {
  return (
    <Navbar expand="lg" className="navigation">
      <Container>
        <style>

        </style>
        
        <Navbar.Brand href="/" className="navBrand" style={{margin: "0 0 0 5%", padding: '0'}}><img src={logo} className="logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto mb-2 mb-lg-0">
            <Nav.Link href="/about">Our<span>&nbsp;</span>Story</Nav.Link>
            <Nav.Link href="/engagement">Info</Nav.Link>
            <Nav.Link href="/news">Updates</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/donate">Partner</Nav.Link>
            <Nav.Link href='/admin'>Admin</Nav.Link>
            {user && <Nav.Link>{user.email}</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Navigation;