import MenuItem from './MenuItem';

function Menu() {
  // <MenuItem to='/'>Home</MenuItem>; คือส่งค่า '/' ในรูปของ to ให้กับ MenuItem

  const menu = [
    {
      to: '/',
      title: 'Home',
    },
    {
      to: '/create-transaction',
      title: 'Create Transaction',
    },
  ];

  return (
    <div className='navbar-collapse justify-content-end'>
      <ul className='navbar-nav'>
        {menu.map(item => (
          <MenuItem key={item.title} to={item.to}>
            {item.title}
          </MenuItem>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
