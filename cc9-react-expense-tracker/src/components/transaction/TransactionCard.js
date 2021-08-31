import axios from 'axios';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TransactionContext } from '../../contexts/transactionContext';
import { formatThaiCurrency } from '../../service/currency';
import { formatShortMonthShortYear } from '../../service/date';

function TransactionCard({ transaction }) {
  const {
    id,
    payee,
    amount,
    date,
    category: { name, type },
  } = transaction;
  const history = useHistory();
  const { transactions, setTransactions } = useContext(TransactionContext);

  const handleClickDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/transactions/${id}`);
      //วิธีที่1
      // const response = await axios.get('http://localhost:8080/transactions');
      // setTransactions(
      //   response.data.transactions.map(item => ({ ...item, date: new Date(item.date) }))
      // );
      //วิธีที่2
      const index = transactions.findIndex(item => item.id === id);
      if (index !== -1) {
        const newTransactions = [...transactions];
        newTransactions.splice(index, 1);
        setTransactions(newTransactions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // {
  //   id: 'f912b5ca-4a36-42be-983e-c06df51b5792',
  //   payee: '3BB',
  //   amount: 631.3,
  //   date: '2021-08-25T00:00:00.000Z',
  //   category: {
  //     id: '8d7eff34-9e78-4a64-9916-d1c3fcb4698a',
  //     name: 'Utilities',
  //     type: 'EXPENSE',
  //   },
  // },

  const color = type === 'EXPENSE' ? 'danger' : 'success';

  const handleClickEdit = () => {
    // history.push(`/edit-transaction/${id}`);
    history.push({
      pathname: `/edit-transaction/${id}`,
      state: { transaction: transaction },
    });
  };

  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center bd-callout bd-callout-${color}`}>
      <div
        className='transaction-detail d-flex flex-fill me-4'
        onClick={() => handleClickEdit()}>
        <div className='transaction-date-card border border-1 border-dark rounded-2 bg-warning p-2 text-center'>
          <p className='p-0 m-0 fs-7 text-black-50'>{formatShortMonthShortYear(date)}</p>
          <p className='p-0 m-0'>{date.getDate()}</p>
        </div>
        <div className='d-flex justify-content-between align-items-center flex-fill ps-4'>
          <div>
            <p className='mb-1 f-5 fw-bold'>{payee}</p>
            <p className='mb-0 text-black-50 fs-7'>{name}</p>
          </div>
          <span className={`badge bg-${color}`}>{formatThaiCurrency(amount)}</span>
        </div>
      </div>
      <button
        className='btn btn-link text-secondary p-0 border-0'
        onClick={handleClickDelete}>
        <i className='bi-x-circle' />
      </button>
    </li>
  );
}

export default TransactionCard;
