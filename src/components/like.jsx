const Like = (props) => {
  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={props.onLike}
      className={`fa fa-heart${props.like ? "" : "-o"}`}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
