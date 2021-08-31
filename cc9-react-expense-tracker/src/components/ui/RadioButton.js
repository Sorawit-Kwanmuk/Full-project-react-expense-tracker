function RadioButton({
  id,
  name,
  children,
  color,
  radius,
  value,
  defaultChecked,
  onChange,
}) {
  //${color ?? 'secondaty'} ถ้าไม่ส่ง props color มาจะทำให้ color เป็น undefined จะไปใช้ค่า secondaty แทน
  const radiusClass = radius ? ` rounded-${radius}` : '';
  return (
    <>
      <input
        type='radio'
        className='btn-check'
        id={id}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <label
        className={`btn btn-outline-${color ?? 'secondaty'} rounded-0${radiusClass}`}
        htmlFor={id}>
        {children}
      </label>
    </>
  );
}

export default RadioButton;
