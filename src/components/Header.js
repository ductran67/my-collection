import { useEffect} from 'react'
import QuoteSlide from "./layout/QuoteSlide";
import PropTypes from 'prop-types';

const Header = ({ quoteCollection }) => {
  // Set default quote
  const quote = 'This is my default quote';
  const citation = 'Default citation'
  if (quoteCollection===null || quoteCollection.length===0) {quoteCollection=[{quote, citation}]}
  useEffect(() => {
    const quoteSlideShow = () => {
      // Get the group of quotes
      const quoteList = document.getElementsByClassName('quote');

      let slideIndex = 0;
      const timeOut = 5000;

      showSlides();
      
      function showSlides() {
        // Set invisisble for all the quote elements
        for (let i = 0; i < quoteList.length; i++) {
          quoteList[i].style.display = "none";
        }
        slideIndex++;
        // Reset slideIndex if it is greater than slides length
        if (slideIndex > quoteList.length) {slideIndex = 1}
        // Display the current quote <div> element
        quoteList[slideIndex-1].style.display = "block";
        setTimeout(showSlides, timeOut); // Change quote every 'timeOut' miliseconds
      }
    }

    quoteSlideShow()
  }, [])

  return (
    <header className='header'>
      {quoteCollection.map((quote, index) => (
        <QuoteSlide key={index} quote={quote.quote} citation={quote.citation} />
      ))}
    </header>
  )
}

Header.propTypes = {
  quoteCollection: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Header
