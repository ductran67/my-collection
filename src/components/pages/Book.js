import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import BookForm from '../BookForm';
import TabularForm from '../TabularForm';
import Button from '../layout/Button';

const Book = () => {
  const [data, setData] = useState([]);
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

  const onSelect = () => {
    // Get all checkbox elements
    const bookCheckBox = document.getElementsByName('checkbox');
    // Filter selected items from data
    const selectedBooks = data.filter((book, index) => bookCheckBox[index].checked);
    if (selectedBooks.length === 0) {
      alert('Please select your favorite books.');
    } else {
      let bookArray=[];
      // Get books from the local storage
      const myBookCollection = JSON.parse(localStorage.getItem("myBookCollection"));

      if (myBookCollection) {
        bookArray = myBookCollection;
      }
      // Check if the selected books already exist in book array
      if (bookArray.length > 0) {
        // Get books titles from bookArray
        const existTitles = bookArray.map((book) => book.title);
        // Filter the new books
        const newBooks= selectedBooks.filter((book) => !existTitles.includes(book.title));
        // Add to new books to book array
        bookArray.push(...newBooks);
      } else {
        // Get all selected books
        bookArray = selectedBooks;
      }
      // Store the books array to my local storage 'myBookCollection'
      localStorage.setItem("myBookCollection",JSON.stringify(bookArray));
      // Message alert when done.
      alert('The task has been done!'); 

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
