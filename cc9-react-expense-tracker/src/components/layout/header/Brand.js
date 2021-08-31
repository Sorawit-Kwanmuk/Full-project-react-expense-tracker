import { Link } from 'react-router-dom';

function Brand() {
  return (
    <Link to='/' className='navbar-brand text-black-50 fw-bolder ts-8' href='/'>
      EXPENSE TRACKER
    </Link>
  );
}

export default Brand;
