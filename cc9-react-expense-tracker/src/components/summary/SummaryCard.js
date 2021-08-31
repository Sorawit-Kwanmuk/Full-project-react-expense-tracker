import { formatThaiCurrency } from '../../service/currency';

function SummaryCard({ bg, title, value }) {
  return (
    <div className='col-sm-4'>
      <div className={`bg-${bg} rounded-2 p-3`}>
        <p className='text-black-50'>{title}</p>
        <h5 className='text-white'>{formatThaiCurrency(value)}</h5>
      </div>
    </div>
  );
}

export default SummaryCard;
