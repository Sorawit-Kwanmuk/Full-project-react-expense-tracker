import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { TransactionContext } from '../../contexts/transactionContext';
import {
  validateTransactionField,
  validateTransactionObject,
} from '../../service/validate';
import Col from '../ui/Col';
import Form from '../ui/Form';
import Option from '../ui/Option';
import RadioButton from '../ui/RadioButton';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import TextInput from '../ui/TextInput';

function EditTransactios() {
  const location = useLocation();

  const [input, setInput] = useState({
    type: location?.state?.transaction?.type || 'EXPENSE',
    payee: location?.state?.transaction?.payee || '',
    categoryId: location?.state?.transaction?.category?.id || '',
    amount: location?.state?.transaction?.amount + '' || '',
    date: location?.state?.transaction?.date.toISOString().slice(0, 10) || '',
    comment: location?.state?.transaction?.comment || '',
  });

  const [optionExpenses, setOptionExpenses] = useState([]);
  const [optionIncomes, setOptionIncomes] = useState([]);
  const [error, setError] = useState({});

  const { transactions, setTransactions } = useContext(TransactionContext);

  const history = useHistory();

  const params = useParams();

  const { type, payee, categoryId, amount, date, comment } = input;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categories');
        const expenses = response.data.categories.filter(item => item.type === 'EXPENSE');
        setOptionExpenses(expenses);
        setOptionIncomes(response.data.categories.filter(item => item.type === 'INCOME'));
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/transactions/${params.id}`
        );
        const transaction = response.data.transaction;
        setInput({
          type: transaction.type,
          payee: transaction.payee,
          amount: transaction.amount + '',
          date: transaction.date.slice(0, 10),
          categoryId: transaction.category.id,
          comment: transaction.comment,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchTransaction();
  }, []);

  const handleChangeInput = e => {
    const validateFields = ['amount', 'date', 'payee'];
    if (validateFields.includes(e.target.name)) {
      const error = validateTransactionField(e.target.value, e.target.name);
      setError(current => ({ ...current, [e.target.name]: error }));
    }
    if (e.target.name === 'type') {
      setInput(current => ({
        ...current,
        categoryId:
          e.target.name === 'EXPENSE' ? optionExpenses[0].id : optionExpenses[0].id,
      }));
    }
    setInput(current => ({ ...current, [e.target.name]: e.target.value }));
  };

  const shownOption = type === 'EXPENSE' ? [...optionExpenses] : [...optionIncomes];

  const handleSubmitForm = async e => {
    e.preventDefault();
    const error = validateTransactionObject(input);
    setError(error);
    if (Object.keys(error).length === 0) {
      try {
        const response = await axios.put(
          `http://localhost:8080/transactions/${params.id}`,
          {
            payee: input.payee,
            amount: +input.amount,
            date: input.date,
            categoryId: input.categoryId,
            comment: input.comment,
          }
        );
        const newTransactions = [...transactions];
        const index = newTransactions.findIndex(item => item.id === params.id);
        if (index !== -1) {
          const updateItem = response.data.transaction;
          newTransactions[index] = { ...updateItem, date: new Date(updateItem.date) };
          setTransactions(newTransactions);
        }

        history.push('/');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='border bg-white rounded-2 p-3'>
      <Form className='row g-3' onSubmit={handleSubmitForm}>
        <Col sm={12}>
          <RadioButton
            id='cbx-expense'
            name='type'
            color='danger'
            radius='start'
            value='EXPENSE'
            onChange={handleChangeInput}
            defaultChecked={type === 'EXPENSE'}>
            Expense
          </RadioButton>{' '}
          <RadioButton
            id='cbx-income'
            name='type'
            color='success'
            radius='end'
            value='INCOME'
            onChange={handleChangeInput}
            defaultChecked={type === 'INCOME'}>
            Income
          </RadioButton>
        </Col>
        <Col sm={6}>
          <TextInput
            label='Payee'
            value={payee}
            onChange={handleChangeInput}
            name='payee'
            error={error.payee}
          />
        </Col>
        <Col sm={6}>
          <Select
            label='Category'
            value={categoryId}
            onChange={handleChangeInput}
            name='categoryId'>
            {shownOption.map(item => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col sm={6}>
          <TextInput
            label='Amount'
            value={amount}
            onChange={handleChangeInput}
            name='amount'
            error={error.amount}
          />
        </Col>
        <Col sm={6}>
          <TextInput
            label='Date'
            type='date'
            value={date}
            onChange={handleChangeInput}
            name='date'
            error={error.date}
          />
        </Col>
        <Col sm={12}>
          <TextArea
            label='Comment'
            value={comment}
            onChange={handleChangeInput}
            name='comment'
          />
        </Col>
        <Col sm={12}>
          <div className='d-grid mt-3'>
            <button className='btn btn-primary'>Save</button>
          </div>
        </Col>
      </Form>
    </div>
  );
}

export default EditTransactios;
