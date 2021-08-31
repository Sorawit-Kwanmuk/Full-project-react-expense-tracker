import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

// const INITIAL_STATE = {
//   transaction: [],
//   search: {
//     Text: '',
//     month: '',
//     year: '',
//   },
//   paging: {
//     perPage: 10,
//     currentPage: 1,
//   },
// };

const TransactionContext = createContext();

function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/transactions');
        setTransactions(
          response.data.transactions.map(item => ({ ...item, date: new Date(item.date) })) //แปลง date ที่เป็น string เป็น date object
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions: transactions, setTransactions: setTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
}

export { TransactionProvider, TransactionContext };
