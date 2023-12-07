const FormRowSelect = ({ name, labelText, list,  defaultValue ="", className, onChange}) => {
  return (
    <div className={`form-row ${className}`}>
      <label htmlFor={name} className="form-label">
       {labelText}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {list.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
