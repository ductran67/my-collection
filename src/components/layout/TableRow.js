import CheckBox from "./CheckBox"
import Image from "./Image"
const TableRow = ({ item, column }) => {
  return (
    <tr>
      {column.map((columnItem, index) => {
        if (columnItem.type === 'checkbox') {
          return <td key={index}><CheckBox /></td>
        }
        if (columnItem.type === 'image') {
          return <td key={index}><Image src={item[`${columnItem.name}`]} /></td>
        }
        return <td key={index}>{item[`${columnItem.name}`]}</td>
      })}
    </tr>
  )
}

export default TableRow
