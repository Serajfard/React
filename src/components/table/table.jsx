import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = (props) => {
  const { items, columns, onSort, sortColumn } = props;
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody items={items} columns={columns} />
    </table>
  );
};

export default Table;
