import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import './Navigation.css';

function Navigation({user}) {
  return (
    <Navbar expand="lg" className="navigation">
      <Container>
      <style>

      </style>
        <Navbar.Brand href="/">Hartfield Mission</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto mb-2 mb-lg-0">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/news">News</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/donate">Donate</Nav.Link>
            <Nav.Link href="/hartevanic">Hartevanic</Nav.Link>
            <Nav.Link href='/admin'>Admin</Nav.Link>
            { user && <Nav.Link>{user.email}</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Navigation;