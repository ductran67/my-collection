import PropTypes from 'prop-types';

const TableHead = ({ col }) => {
  return <th>{col.value}</th>
}

TableHead.propTypes = {
  col: PropTypes.object.isRequired
};

export default TableHead
