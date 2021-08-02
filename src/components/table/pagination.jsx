import PropTypes from "prop-types";

const Pagination = (props) => {
  const { ItemCounts, pageSize, current, onPageChange } = props;
  let temp = ItemCounts / pageSize;
  let pageCount =
    Math.floor(temp) < temp ? Math.floor(temp) + 1 : Math.floor(temp);

  if (pageCount === 1) return null;
  const items = [...Array(pageCount).keys()];

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {items.map((page) => (
          <li
            key={page + 1}
            className={`page-item ${page + 1 === current ? "active" : ""}`}
          >
            <button
              onClick={() => onPageChange(page + 1)}
              className="page-link"
            >
              {page + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  ItemCounts: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
