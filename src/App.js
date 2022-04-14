import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Quote from './components/pages/Quote';
import MyBook from './components/pages/MyBook';
import Book from './components/pages/Book';

function App() {
  const [quotes, setQuotes] = useState([]);
  
  useEffect(() => {
    const getQuotes = () => {
      // Get my favorite quotes from local storage
      const myLocalStorage = JSON.parse(localStorage.getItem("myQuoteCollection"));
      // If the local storage has some quotes
      if (myLocalStorage) {
        // Store quotes in quote array
        setQuotes(myLocalStorage);
      }
    }
    getQuotes();
  }, []);
  // Add new quote function 
  const addQuote = (quote) => {
    let exist = false;
    if (quotes.length > 0) {
      // Check if the input quote exists in quote array or not
      for (const q of quotes) {
        if (q.quote === quote.quote && q.citation === quote.citation) {
          exist = true;
          alert('This quote already exists in the quote collection. Please input another quote.')
          break;
        }
      }
    };

    if (!exist) {
      quotes.push(quote);
      // Store this quote array to my local storage
      localStorage.setItem("myQuoteCollection",JSON.stringify(quotes));
      
      setQuotes(JSON.parse(localStorage.getItem("myQuoteCollection")));
    }
  };

  // Delete selected quotes function
  const DeleteSelectedQuotes = () => {
    // Get all checkbox elements
    const quoteCheckBox = document.getElementsByName("checkbox");
    // Get all selected quotes
    const checked = quotes.filter((quote, index) => quoteCheckBox[index].checked);
    if (checked.length === 0) {
      alert('Please select any quotes that you want to delete!');
    } else {
      // Add all unchecked quotes to a new array 
      const newQuoteArray = quotes.filter((quote, index) => !quoteCheckBox[index].checked)
      // Store this new quote array to my local storage
      localStorage.setItem("myQuoteCollection",JSON.stringify(newQuoteArray));
      // Add new quote array to quotes
      setQuotes(newQuoteArray);
      // Reset all checked checkboxes
      for (let checkbox of quoteCheckBox) {checkbox.checked=false;}
    }
  }

  const DeleteAllQuotes = () => {
    if (quotes.length > 0) {
      if (window.confirm('Are you sure to delete all your favorite quotes?')) {
        // Remove item "myQuoteCollection" from localStorage
        localStorage.removeItem("myQuoteCollection");
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
        <Header data={JSON.parse(localStorage.getItem("myQuoteCollection"))} />
          <NavBar />
          <Routes>
            <Route exact path='/' element=
              {<Quote
                quotes={quotes} 
                addQuote={addQuote}
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
