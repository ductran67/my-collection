import { Container, Row, Col } from 'react-bootstrap';
import QuoteForm from '../QuoteForm';
import TabularForm from '../TabularForm';
import Button from '../layout/Button';
const Quote = ({ quotes, addQuote, onSelectedDelete, onDeleteAll }) => {

  const column = [
    {name: 'checkbox', type: 'checkbox', value: '\u2713'},
    {name: 'quote', type: 'string', value: 'Quote'},
    {name: 'citation', type: 'string', value: 'Citation'},
    {name: 'date', type: 'date', value: 'Collection Date'}
  ];

  return (
    <Container fluid>
      <Row>
        {/* Quote form area */}
        <Col>
          <QuoteForm quotes={quotes} addQuote={addQuote} />
        </Col>
        {/* Quote Tabular form area */}
        <Col xl={7}>
          {quotes.length > 0 ? (
            <>
              <Button text='Delete Selected Items' onClick={onSelectedDelete}/>
              <Button text='Delete All' onClick={onDeleteAll}/>
            </>
          ) : ('')}
          <TabularForm data={quotes} column={column} />
        </Col>
      </Row>
    </Container>
  )
}

export default Quote;
