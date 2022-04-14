import {Form, Button} from 'react-bootstrap'
import { useState } from 'react';

const QuoteForm = ({ quotes, addQuote }) => {
  const [quote, setQuote] = useState('');
  const [citation, setCitation] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (!(quote && citation) || (quote.trim().length === 0 || citation.trim().length === 0)) {
      alert('Invalid input. Please enter your favorite quote with its citation!');
      return;
    } else {
      const date = new Date().toLocaleString();
      addQuote({ quote, citation, date });
      // Reset input fields values
      setQuote('');
      setCitation('');
    }
  };

  return (
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
  )
}

export default QuoteForm;
