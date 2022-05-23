import {Form, Button, Alert} from 'react-bootstrap'
import { useState } from 'react';
import quoteDataService from '../services/quote.services';
import PropTypes from 'prop-types';
const QuoteForm = ({ getQuotes }) => {
  const [quote, setQuote] = useState('');
  const [citation, setCitation] = useState('');
  const [message, setMessage] = useState({ error: false, msg: "" });
  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!(quote && citation) || (quote.trim().length === 0 || citation.trim().length === 0)) {
      // alert('Invalid input. Please enter your favorite quote with its citation!');
      setMessage({ error: true, msg: 'Invalid input. Please enter your favorite quote with its citation!' });
      return;
    } else {
      const data = await quoteDataService.findQuote(quote, citation);
      if (data.length > 0) {
        // alert('This quote already exists in the quote collection. Please input another quote.');
        setMessage({ error: true, msg: 'This quote already exists in the quote collection. Please input another quote.' });
      } else {
        const date = new Date().toLocaleString();
        await quoteDataService.addQuote({ quote, citation, date });
        getQuotes();
      }
      // Reset input fields values
      setQuote('');
      setCitation('');
    }
  };

  return (
    <>
      {message?.msg && (
        <Alert
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => setMessage("")}>
          {message?.msg}
        </Alert>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formQuote">
          <Form.Label>Your Favorite Quote:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your favorite quote..."
            value={quote}
            onChange = {(e) => setQuote(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCitation">
          <Form.Label>Citation: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter citation..."
            value={citation}
            onChange={(e) => setCitation(e.target.value)}
            required
          />
        </Form.Group>
        
        <Button variant="primary" type="submit">Add quote</Button>
      </Form>
    </>
  )
}

QuoteForm.propTypes = {
  getQuotes: PropTypes.func.isRequired
}

export default QuoteForm;
