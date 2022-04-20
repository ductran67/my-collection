import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Quote from './components/pages/Quote';
import MyBook from './components/pages/MyBook';
import Book from './components/pages/Book';
import quoteDataService from './services/quote.services';

function App() {
  const [quotes, setQuotes] = useState([]);
  
  useEffect(() => {
    getQuotes();
  }, []);

  const getQuotes = async () => {
    const data = await quoteDataService.getAllQuotes();
    setQuotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  // Delete selected quotes function
  const DeleteSelectedQuotes = async() => {
    // Get all checkbox elements
    const quoteCheckBox = document.getElementsByName("checkbox");
    // Get all selected quotes
    const checked = quotes.filter((quote, index) => quoteCheckBox[index].checked);
    if (checked.length === 0) {
      alert('Please select any quotes that you want to delete!');
    } else {
      // Scan through the selected quotes to delete
      checked.map(async(quote) => ({...await quoteDataService.deleteQuote(quote.id), id: quote.id}));
      await getQuotes();

      // Reset all checked checkboxes
      for (let checkbox of quoteCheckBox) {checkbox.checked=false;}
    }
  }

  const DeleteAllQuotes = () => {
    if (quotes.length > 0) {
      if (window.confirm('Are you sure to delete all your favorite quotes?')) {
        quotes.map(async(quote) => ({...await quoteDataService.deleteQuote(quote.id), id: quote.id}));
        // getQuotes();
        // Empty quote array
        setQuotes([]);
      }      
    } else {
      alert('There is nothing to delete.');
    }
  }

  return (
    <BrowserRouter>
      <Container fluid>
        <Header quotes={quotes} getQuotes={getQuotes} />
          <NavBar />
          <Routes>
            <Route exact path='/' element=
              {<Quote
                quotes={quotes} 
                getQuotes={getQuotes}
                onSelectedDelete={DeleteSelectedQuotes}
                onDeleteAll={DeleteAllQuotes}
              />}
            />
            <Route path='/my-book' element={<MyBook />}
            />
            <Route path='/book' element={<Book/>} />
          </Routes>
          <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default App;
