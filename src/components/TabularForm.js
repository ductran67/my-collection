import Table from 'react-bootstrap/Table'
import TableHead from './layout/TableHead';
import TableRow from './layout/TableRow';
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

export default TabularForm;
