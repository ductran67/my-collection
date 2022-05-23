import { Form, Button, Alert } from 'react-bootstrap'
import { useState } from 'react';
import PropTypes from 'prop-types';
const BookForm = ({ getBook }) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState({ error: false, msg: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage("");
    if (!(year && month && date) || (year.trim().length === 0 || month.trim().length === 0 || date.trim().length === 0)) {
      // alert('Invalid input. Please enter the correct numbers');
      setMessage({ error: true, msg: "All fields are mandatory! Please enter the correct info." });
      return;
    } else {
      // Define some input vars
      const dateInput = `${year}-${month}-${date}`;
      const API_KEY = 'dSWRtBeBGQ5spD5u1Df1B8IGtDfz57Ck';
      const list = 'hardcover-fiction';  
      const BASE_URL = `https://api.nytimes.com/svc/books/v3/lists/${dateInput}/${list}.json`;
    
      const url = `${BASE_URL}?api-key=${API_KEY}`;
      getBook(url);
      // Reset input fields values
      setYear('');
      setMonth('');
      setDate('');
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
        <Form.Group className="mb-3" controlId="formBook">
          <Form.Label>Year:</Form.Label>
          <Form.Control
            type="text"
            pattern="\d{4}" 
            placeholder="2022"
            value={year}
            onChange = {(e) => setYear(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBook">
          <Form.Label>Month:</Form.Label>
          <Form.Control
            type="text"
            pattern="\d{2}" 
            placeholder="04"
            value={month}
            onChange = {(e) => setMonth(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBook">
          <Form.Label>Date:</Form.Label>
          <Form.Control
            type="text"
            pattern="\d{2}" 
            placeholder="16"
            value={date}
            onChange = {(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">Get Books</Button>
      </Form>
    </>
  )
}

BookForm.propTypes = {
  getBook: PropTypes.func.isRequired
};

export default BookForm
