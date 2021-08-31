import { useContext, useEffect } from 'react';
import { SearchContext } from '../../contexts/searchContext';
import { PaginationContext } from '../ui/paginationContext';

function FilterContainer() {
  // const context = useContext(SearchContext)

  const {
    searchtext,
    setSearchText,
    searchMonth,
    setSearchMonth,
    searchYear,
    setSearchYear,
  } = useContext(SearchContext);

  const { setCurrentPage } = useContext(PaginationContext);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchtext, searchMonth, searchYear, setCurrentPage]);

  return (
    <div className='mt-4'>
      <div className='row g-3'>
        <div className='col-sm-6'>
          <div className='input-group'>
            <input
              type='text'
              className='form-control form-control-sm'
              placeholder='Enter to search'
              value={searchtext}
              onChange={e => {
                setSearchText(e.target.value);
                // setCurrentPage(1);
              }}
            />
            <button
              className='btn btn-sm btn-outline-light'
              onClick={() => {
                setSearchText('');
                // setCurrentPage(1);
              }}>
              x
            </button>
          </div>
        </div>
        <div className='col-sm-3'>
          <div className='input-group'>
            <select
              className='form-select form-select-sm'
              value={searchMonth}
              onChange={
                e => {
                  setSearchMonth(e.target.value === '' ? '' : +e.target.value);
                  // setCurrentPage(1);
                }
                // setSearchMonth(e.target.value && +e.target.value)
              }>
              <option value=''>Month</option>
              <option value='0'>Jan</option>
              <option value='1'>Feb</option>
              <option value='2'>Mar</option>
              <option value='3'>Apr</option>
              <option value='4'>May</option>
              <option value='5'>Jun</option>
              <option value='6'>Jul</option>
              <option value='7'>Aug</option>
              <option value='8'>Sep</option>
              <option value='9'>Oct</option>
              <option value='10'>Nov</option>
              <option value='11'>Dec</option>
            </select>
            <button
              className='btn btn-sm btn-outline-light'
              onClick={() => {
                setSearchYear('');
                // setCurrentPage(1);
              }}>
              x
            </button>
          </div>
        </div>
        <div className='col-sm-3'>
          <div className='input-group'>
            <select
              className='form-select form-select-sm'
              value={searchYear}
              onChange={e => setSearchYear(e.target.value === '' ? '' : +e.target.value)}
              // setSearchYear(e.target.value && +e.target.value)
            >
              <option value=''>Year</option>
              <option value='2021'>2021</option>
              <option value='2020'>2020</option>
              <option value='2019'>2019</option>
              <option value='2018'>2018</option>
            </select>
            <button
              className='btn btn-sm btn-outline-light'
              onClick={() => {
                setSearchYear('');
                // setCurrentPage(1);
              }}>
              x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterContainer;
