import { createContext, useState } from 'react';

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [searchText, setSearchText] = useState('');
  const [searchMonth, setSearchMonth] = useState('');
  const [searchYear, setSearchYear] = useState('');

  // const [search, setSearch] = useState({text:'',month:'',year:''});

  return (
    <SearchContext.Provider
      value={{
        searchText: searchText,
        setSearchText: setSearchText,
        searchMonth: searchMonth,
        setSearchMonth: setSearchMonth,
        searchYear: searchYear,
        setSearchYear: setSearchYear,
      }}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchProvider };
