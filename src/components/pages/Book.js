import { useState } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap';
import BookForm from '../BookForm';
import TabularForm from '../TabularForm';
import Button from '../layout/Button';
import bookDataService from '../../services/book.services';

const Book = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const column = [
    {name: 'checkbox', type: 'checkbox', value: '\u2713'},
    {name: 'title', type: 'string', value: 'Title'},
    {name: 'book_image', type: 'image', value: 'Image'},
    {name: 'description', type: 'string', value: 'Description'},
    {name: 'author', type: 'string', value: 'Author'}
  ];

  const getBook = async (url) => {
    const res = await fetch(url);
    const books = await res.json();
    // console.log(books.results.books);
    setData(books.results.books);
  }

  const onSelect = async () => {
    setMessage('');
    // Get all checkbox elements
    const bookCheckBox = document.getElementsByName('checkbox');
    // Filter selected items from data
    const selectedBooks = data.filter((book, index) => bookCheckBox[index].checked);
    if (selectedBooks.length === 0) {
      setMessage({ error: true, msg: "Please select your favorite books." });
      // alert('Please select your favorite books.');
    } else {
      selectedBooks.forEach(async (book) => {
        // Get book's info
        const { title, author, book_image, description } = book;
        // check if this book already exists in bookTb or not
        const data = await bookDataService.findBook(title, author);
        if (data.length ===0) {
          // console.log('add new book.')
          const date = new Date().toLocaleString();
          await bookDataService.addBook({title, author, book_image, description, date});
        }
      });

      // Message alert when done.
      setMessage({ error: false, msg: "The task has been done!" });
      // alert('The task has been done!'); 

      // Reset all checkboxes of the checkbox list in book table
      for (let checkbox of bookCheckBox) {checkbox.checked = false;}
    }
  }

  return (
    <Container fluid>
      <Row>
        {/* Input form area */}
        <Col>
          <BookForm getBook={getBook} />
        </Col>
        {/* Book Tabular form area */}
        <Col xl={10}>
          {data.length > 0 ? (
            <div>
              {message?.msg && (
                <Alert
                  variant={message?.error ? "danger" : "success"}
                  dismissible
                  onClose={() => setMessage("")}>
                  {message?.msg}
                </Alert>
              )}
              <Button text='Select Books' onClick={onSelect}/>
            </div>
          ) : ('')}
          <TabularForm data={data} column={column} />
        </Col>
      </Row>
    </Container>
  )
}

export default Book;
