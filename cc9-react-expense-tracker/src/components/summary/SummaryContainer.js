import SummaryCard from './SummaryCard';

function SummaryContainer({ transactions }) {
  // const expense = transactions.reduce((sum, item) => {
  //   if (item.category.type === 'EXPENSE') {
  //     return sum + item.amount;
  //   }
  //   return sum;
  // }, 0);
  // const income = transactions.reduce((sum, item) => {
  //   if (item.category.type === 'INCOME') {
  //     return sum + item.amount;
  //   }
  //   return sum;
  // }, 0);

  const expense = transactions.reduce(
    (sum, { amount, category: { type } }) => (type === 'EXPENSE' ? (sum += amount) : sum),
    0
  );
  const income = transactions.reduce(
    (sum, { amount, category: { type } }) => (type === 'INCOME' ? (sum += amount) : sum),
    0
  );

  return (
    <div className='row g-3'>
      <SummaryCard bg='info' title='Net worth' value={income - expense} />
      <SummaryCard bg='success' title='Income' value={income} />
      <SummaryCard bg='danger' title='Expenses' value={expense} />
    </div>
  );
}

export default SummaryContainer;
