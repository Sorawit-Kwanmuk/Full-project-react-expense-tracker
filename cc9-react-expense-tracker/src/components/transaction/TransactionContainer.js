import { useContext } from 'react';
import { PaginationContext } from '../ui/paginationContext';

import TransactionCard from './TransactionCard';

function TransactionContainer({ transactions }) {
  const { perPage, currentPage } = useContext(PaginationContext);

  // currentPage:1 perPage:10 => show transaction 1 to 10 (index 0 to index 9)
  // currentPage:2 perPage:10 => show transaction 11 to 20 (index 10 to index 19)
  // currentPage:3 perPage:10 => show transaction 21 to 30 (index 20 to index 29)
  //...
  //currentPage:n perPage:10 => show transaction 10 * (n - 1) +1 to 10 * n (index 10 * (n - 1) to index 10 * n -1)
  // [1,2,5,7].slice(2)  [5,7]
  // [1,2,5,7].slice(2,3)  [5]

  //#1 showTransactions
  const showTransactions = transactions.slice(
    perPage * (currentPage - 1),
    perPage * currentPage
  );
  // #2 showTransactions
  // const showTransactions = transactions.filter(
  //   (item, index) =>
  //     index <= currentPage * (perPage - 1) && index >= perPage * (currentPage - 1)
  // );

  // state = [
  //   {
  //     id: 'f912b5ca-4a36-42be-983e-c06df51b5792',
  //     payee: '3BB',
  //     amount: 631.3,
  //     date: '2021-08-25T00:00:00.000Z',
  //     category: {
  //       id: '8d7eff34-9e78-4a64-9916-d1c3fcb4698a',
  //       name: 'Utilities',
  //       type: 'EXPENSE',
  //     },
  //   },
  // ];
  return (
    <ul className='list-group'>
      {showTransactions.map(item => (
        <TransactionCard key={item.id} transaction={item} />
      ))}
    </ul>
  );
}

export default TransactionContainer;
