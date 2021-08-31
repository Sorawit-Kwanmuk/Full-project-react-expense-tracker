//type={type ?? 'text'} ภ้ามีค่าเป็น null หรือ undefind จะเป็น text ถ้ามีค่าtypelj',k ให้ใช้ค่านั้น
function TextInput({ label, type, value, onChange, name, error }) {
  return (
    <>
      <label className='form-label'>{label}</label>
      <input
        type={type ?? 'text'}
        className={`form-control${error ? ' is-invalid' : ''}`}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error && <div className='invalid-feedback'>{error}</div>}
    </>
  );
}

export default TextInput;
