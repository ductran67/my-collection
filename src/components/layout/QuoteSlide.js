import PropTypes from 'prop-types';

const QuoteSlide = ({ quote, citation }) => {
  return (
    <div className='quote animated fadeInDown'>
      <h1 className='content'>{quote}</h1>
      <p className='citation'>{citation}</p>
    </div>
  )
};

QuoteSlide.propTypes = {
  quote: PropTypes.string.isRequired,
  citation: PropTypes.string.isRequired
};

export default QuoteSlide
