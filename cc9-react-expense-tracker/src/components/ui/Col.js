function Col({ children, sm, md }) {
  const colSm = sm ? ` col-sm-${sm}` : '';
  const colMd = md ? ` col-md-${md}` : '';
  return <div className={`col-12${colSm}${colMd}`}>{children}</div>;
}

export default Col;
