import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      <style>
        
      </style>
        <Navbar.Brand href="/">Hartfield Mission</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/news">News</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/donate">Donate</Nav.Link>
            <Nav.Link href="/hartevanic">Hartevanic</Nav.Link>
            <Nav.Link href='/admin'>Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        
      </Container>
      
    </Navbar>
  );
}


export default Navigation;