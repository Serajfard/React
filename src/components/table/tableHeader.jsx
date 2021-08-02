// columns : array
// onSort : func
// sortColumn : object

const TableHeader = (props) => {
  const { columns, onSort, sortColumn } = props;

  function raiseSort(path) {
    if (!sortColumn) return;
    const newSortObj = { ...sortColumn };
    if (path === newSortObj.path) {
      newSortObj.order = newSortObj.order === "asc" ? "desc" : "asc";
    } else {
      newSortObj.order = "asc";
      newSortObj.path = path;
    }
    if (onSort) onSort(newSortObj);
  }

  function renderSortIcon(column) {
    if (sortColumn.path !== column.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  }

  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th
            style={{ cursor: "pointer" }}
            key={col.path || col.key}
            onClick={() => raiseSort(col.path)}
          >
            {col.label}
            {renderSortIcon(col)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
