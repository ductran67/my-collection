import { useState, useEffect } from 'react'
import { Container, Row, Alert } from 'react-bootstrap';
import TabularForm from '../TabularForm';
import Button from '../layout/Button';
import bookDataService from '../../services/book.services';

const MyBook = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const column = [
    {name: 'checkbox', type: 'checkbox', value: '\u2713'},
    {name: 'title', type: 'string', value: 'Title'},
    {name: 'book_image', type: 'image', value: 'Image'},
    {name: 'description', type: 'string', value: 'Description'},
    {name: 'author', type: 'string', value: 'Author'},
    {name: 'date', type: 'date', value: 'Collection Date'}
  ];
  // Get data from bookCollection in local storage
  useEffect(() => {
    getBooks();
  }, []);
  // Get all books from bookTb
  const getBooks = async () => {
    const books = await bookDataService.getAllBooks();
    setData(books.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  const DeleteSelectedBooks = async () => {
    // Get all checkbox elements
    const bookCheckBox = document.getElementsByName("checkbox");
    // Get all selected books
    const checked = data.filter((book, index) => bookCheckBox[index].checked);
    if (checked.length === 0) {
      setMessage({ error: true, msg: 'Please select any books that you want to delete!' });
      // alert('Please select any books that you want to delete!');
    } else {
      // Scan through the selected books
      checked.map(async(book) => ({...await bookDataService.deleteBook(book.id), id: book.id}));
      // Call the function to get all books from bookTb
      await getBooks();
      // Reset all checked checkboxes
      for (let checkbox of bookCheckBox) {checkbox.checked=false;}
    }
  }

  const DeleteAllBooks = () => {
    if (data.length > 0) {
      if (window.confirm('Are you sure to delete all your favorite books?')) {
        data.map(async(book) => ({...await bookDataService.deleteBook(book.id), id: book.id}));
        // Empty data array
        setData([]);
      }
    } else {
      setMessage({ error: false, msg: 'There is nothing to delete!' });
      // alert('There is nothing to delete.');
    }
  }

  return (
    <Container fluid>
      <Row>
        {/* Book Tabular form area */}
        {data.length > 0 ? (
          <div className="p-4 box">
            {message?.msg && (
              <Alert
                variant={message?.error ? "danger" : "success"}
                dismissible
                onClose={() => setMessage("")}>
                {message?.msg}
              </Alert>
            )}
            <Button text='Delete Selected Books' onClick={DeleteSelectedBooks}/>
            <Button text='Delete All Books' onClick={DeleteAllBooks}/>
          </div>
        ) : ('')}
        <TabularForm data={data} column={column} />
      </Row>
    </Container>
  )
}

export default MyBook;