import PropTypes from 'prop-types';

const Image = ({ src }) => {
  return (
    <img src={src} alt='' style={{ width: '100%'}} />
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired
};

export default Image
