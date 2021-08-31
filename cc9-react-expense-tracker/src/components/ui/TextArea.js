function TextArea({ label, value, onChange, name }) {
  return (
    <>
      <label className='form-label'>{label}</label>
      <textarea
        className='form-control'
        rows='3'
        value={value}
        onChange={onChange}
        name={name}></textarea>
    </>
  );
}

export default TextArea;
