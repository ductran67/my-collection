import { Container, Row, Col, Stack } from 'react-bootstrap';
import Header from '../Header';
import NavBar from '../NavBar';
import Footer from '../Footer';

const Layout = (props) => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Header />
          <Stack gap={3}>
            <div><NavBar /></div>
            <div>
              <main>{props.children}</main>
            </div>
            <div><Footer /></div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default Layout
