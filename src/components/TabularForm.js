import Table from 'react-bootstrap/Table'
import TableHead from './layout/TableHead';
import TableRow from './layout/TableRow';
import PropTypes from 'prop-types';
const TabularForm = ({ data, column }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {column.map((col, index) => <TableHead key={index} col={col} />)}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => <TableRow key={index} item={item} column={column} />)}
      </tbody>
    </Table>
  )
}

TabularForm.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  column: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TabularForm;
