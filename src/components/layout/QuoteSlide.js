// import { quote, animated, fadeInDown, content, citation } from './QuoteSlide.module.css';
const QuoteSlide = ({ quote, citation }) => {
  return (
    <div className='quote animated fadeInDown'>
      <h1 className='content'>{quote}</h1>
      <p className='citation'>{citation}</p>
    </div>
  )
}

export default QuoteSlide
