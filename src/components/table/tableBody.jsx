import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const TableBody = (props) => {
  function renderCell(item, column) {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  }

  const { items, columns } = props;

  return (
    <tbody>
      {items.map((item) => (
        <tr key={uuidv4()}>
          {columns.map((column) => (
            <td key={uuidv4()}>{renderCell(item, column)} </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
