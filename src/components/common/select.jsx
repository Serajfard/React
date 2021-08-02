const Select = ({
  name,
  label,
  options,
  error,
  valueField,
  textField,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} name={name} id={name} className="form-control">
        {options.map((option) => (
          <option key={option[valueField]} value={option[valueField]}>
            {option[textField]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
