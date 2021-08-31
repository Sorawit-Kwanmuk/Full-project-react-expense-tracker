import { useContext } from 'react';
import { SearchContext } from '../../contexts/searchContext';
import { TransactionContext } from '../../contexts/transactionContext';
import FilterContainer from '../filter/FilterContainer';
import PaginationContainer from '../pagination/PaginationContainer';
import SummaryContainer from '../summary/SummaryContainer';
import TransactionContainer from '../transaction/TransactionContainer';

function Home() {
  const { transactions } = useContext(TransactionContext); //{transactions:[...],setTransactions:func()}
  const { searchText, searchMonth, searchYear } = useContext(SearchContext);

  const filterTransactions = transactions.filter(
    item =>
      (item.payee.toLowerCase().includes(searchText.toLowerCase()) ||
        item.category.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.category.type.toLowerCase().includes(searchText.toLowerCase())) &&
      (item.date.getMonth() === searchMonth || searchMonth === '') &&
      //   (item.date.slice(5, 7) ===
      //     (`${searchMonth + 1} `.length === 1
      //       ? 0 + `${searchMonth + 1} `
      //       : `${searchMonth + 1}` || searchMonth === ''
      // )
      (item.date.getFullYear() === searchYear || searchYear === '')
  );

  return (
    <>
      <SummaryContainer transactions={filterTransactions} />
      <FilterContainer />
      <PaginationContainer length={filterTransactions.length} />
      <TransactionContainer transactions={filterTransactions} />
    </>
  );
}

export default Home;
