import { Container, Row, Col } from 'react-bootstrap';
import QuoteForm from '../QuoteForm';
import TabularForm from '../TabularForm';
import Button from '../layout/Button';
import PropTypes from 'prop-types';
const Quote = ({ quoteList, getQuotes, onSelectedDelete, onDeleteAll }) => {
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
          <QuoteForm getQuotes={getQuotes} />
        </Col>
        {/* Quote Tabular form area */}
        <Col xl={7}>
          {quoteList.length > 0 ? (
            <>
              <Button text='Delete Selected Items' onClick={onSelectedDelete}/>
              <Button text='Delete All' onClick={onDeleteAll}/>
              <TabularForm data={quoteList} column={column} />
            </>
          ) : ('')}

        </Col>
      </Row>
    </Container>
  )
}

Quote.propTypes = {
  quoteList: PropTypes.arrayOf(PropTypes.object).isRequired,
  getQuotes: PropTypes.func.isRequired,
  onSelectedDelete: PropTypes.func.isRequired,
  onDeleteAll: PropTypes.func.isRequired
};

export default Quote;
