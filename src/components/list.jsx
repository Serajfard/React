import PropTypes from "prop-types";

const List = (props) => {
  const { items, onItemClick, currentItemId } = props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item._id}
          style={{ cursor: "pointer" }}
          onClick={() => onItemClick(item)}
          className={`list-group-item ${
            currentItemId === item._id ? "active" : ""
          }`}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.exact({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired,
  currentItemId: PropTypes.string,
};

export default List;
