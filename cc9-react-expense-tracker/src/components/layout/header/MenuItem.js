import { NavLink } from 'react-router-dom';

function MenuItem({ children, to }) {
  return (
    <li className='nav-item'>
      <NavLink exact className='nav-link' activeClassName='active fw-bolder' to={to}>
        {children}
      </NavLink>
    </li>
  );
}

export default MenuItem;
