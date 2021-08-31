function Select({ label, children, value, onChange, name }) {
  return (
    <>
      <label className='form-label'>{label}</label>
      <select className='form-select' value={value} onChange={onChange} name={name}>
        {children}
      </select>
    </>
  );
}

export default Select;
