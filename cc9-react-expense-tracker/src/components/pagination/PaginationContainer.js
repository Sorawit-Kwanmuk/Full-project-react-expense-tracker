import { useContext } from 'react';
import { PaginationContext } from '../ui/paginationContext';

function PaginationContainer({ length }) {
  const { perPage, setPerPage, currentPage, setCurrentPage } =
    useContext(PaginationContext);
  const numPage = Math.ceil(length / perPage);
  const result = [];
  for (let i = 1; i <= numPage; i++) {
    result.push(i);
  }

  if (result.length === 0) {
    result.push(1);
  }

  // const createPageList = () => {
  //   const result = [];
  //   for (let i = 0; i < numPage; i++) {
  //     result.push(
  //       <li className='page-item active' key={i}>
  //         <a href='/' className='page-link'>
  //           <span>{i + 1}</span>
  //         </a>
  //       </li>
  //     );
  //   }
  //   return result;
  // };

  const handleClickPrevious = e => {
    e.preventDefault();
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClickNext = e => {
    e.preventDefault();
    if (currentPage !== numPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPage = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  //case: Length = 0
  //currentPage: 1, perPage: 10 length:0 Showing 0 to 0 of 0
  //case: Length > 0
  //currentPage: 1, perPage: 10 => Showing 1 to 10 of 34
  //currentPage: 2, perPage: 10 => Showing 11 to 20 of 34
  //currentPage: 3, perPage: 10 => Showing 21 to 30 of 34
  //currentPage: 4, perPage: 10 => Showing 31 to 34 of 34
  //currentPage: n, perPage: m => Showing (n-1)*m+1 to n*m >length ? length : n*m of length
  let pagingMessage = `Showing 0 to 0 of 0 transactions`;
  if (length > 0) {
    pagingMessage = `Showing ${(currentPage - 1) * perPage + 1} to ${
      currentPage * perPage ? length : currentPage * perPage
    } of ${length} transactions`;
  }

  return (
    <div className='mt-3 d-flex justify-content-between'>
      <div className='d-flex align-items-center mb-3'>
        <div>
          <select
            type='text'
            className='form-select form-select-sm'
            value={perPage}
            onChange={e => {
              setPerPage(+e.target.value);
              setCurrentPage(1);
            }}>
            <option value='10'>10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>
        </div>
        <span className='text-white-50 mx-2 fs-7'>{pagingMessage}</span>
        {/* <span className='text-white-50 mx-2 fs-7'>
          {length > 0
            ? `${(currentPage - 1) * perPage + 1} to ${
                currentPage * perPage ? length : currentPage * perPage
              } of ${length} transactions`
            : `Showing 0 to 0 of 0 transactions`}
        </span> */}
      </div>
      <nav>
        <ul className='pagination pagination-sm'>
          <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
            <a href='/' className='page-link' onClick={handleClickPrevious}>
              <span>&laquo;</span>
            </a>
          </li>
          {/* {createPageList()} */}
          {result.map(item => (
            <li
              className={`page-item${item === currentPage ? ' active' : ''}`}
              key={item}>
              <a href='/' className='page-link' onClick={e => handleClickPage(e, item)}>
                {/* onclick={e => {
                  e.preventDefault();
                  setCurrentPage(item);
                }> */}
                <span>{item}</span>
              </a>
            </li>
          ))}

          <li className={`page-item${currentPage === numPage ? ' disable' : ''}`}>
            <a href='/' className='page-link' onClick={handleClickNext}>
              <span>&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PaginationContainer;
