import PropTypes from 'prop-types';

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='btn'
      variant="primary"
    >
      {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button
