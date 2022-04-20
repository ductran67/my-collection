import { useEffect} from 'react'
import QuoteSlide from "./layout/QuoteSlide";
const Header = ({ quotes, getQuotes }) => {
  // getQuotes();
  // Set default quote
  const quote = 'This is my default quote';
  const citation = 'Default citation'
  if (quotes===null || quotes.length===0) {quotes=[{quote, citation}]}
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
      {quotes.map((quote, index) => (
        <QuoteSlide key={index} quote={quote.quote} citation={quote.citation} />
      ))}
    </header>
  )
}

export default Header
