import { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';
import TabularForm from '../TabularForm';
import Button from '../layout/Button';
const MyBook = () => {
  const [data, setData] = useState([]);
  const column = [
    {name: 'checkbox', type: 'checkbox', value: '\u2713'},
    {name: 'title', type: 'string', value: 'Title'},
    {name: 'book_image', type: 'image', value: 'Image'},
    {name: 'description', type: 'string', value: 'Description'},
    {name: 'author', type: 'string', value: 'Author'}
  ];
  // Get data from bookCollection in local storage
  useEffect(() => {
    const getBooks = () => {
      // Get my favorite quotes from local storage
      const myLocalStorage = JSON.parse(localStorage.getItem("myBookCollection"));
      // If the local storage has data
      if (myLocalStorage) {
        // Store data in book array
        setData(myLocalStorage);
      }
    }
    getBooks();
  }, []);

  const DeleteSelectedBooks = () => {
    // Get all checkbox elements
    const bookCheckBox = document.getElementsByName("checkbox");
    // Get all selected books
    const checked = data.filter((book, index) => bookCheckBox[index].checked);
    if (checked.length === 0) {
      alert('Please select any books that you want to delete!');
    } else {
      // Add all unchecked books to a new array 
      const newBookArray = data.filter((book, index) => !bookCheckBox[index].checked)
      // Store this new quote array to my local storage
      localStorage.setItem("myBookCollection",JSON.stringify(newBookArray));
      // Set data with new book collection
      setData(newBookArray);
      // Reset all checked checkboxes
      for (let checkbox of bookCheckBox) {checkbox.checked=false;}
    }
  }

  const DeleteAllBooks = () => {
    if (data.length > 0) {
      if (window.confirm('Are you sure to delete all your favorite books?')) {
        // Remove item "myBookCollection" from localStorage
        localStorage.removeItem("myBookCollection");
        setData([]);
      }
    } else {
      alert('There is nothing to delete.');
    }
  }

  return (
    <Container fluid>
      <Row>
        {/* Book Tabular form area */}
        {data.length > 0 ? (
          <div>
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