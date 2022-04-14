import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to={"/"}>My Collection</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to='/'>Quote Collection</Nav.Link>
          <Nav.Link as={Link} to='/my-book'>Book Collection</Nav.Link>
          <Nav.Link as={Link} to='/book'>Books Searching...</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar
