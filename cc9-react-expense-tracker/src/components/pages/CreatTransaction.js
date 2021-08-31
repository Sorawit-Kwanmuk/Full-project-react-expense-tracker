import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
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
import { TransactionContext } from '../../contexts/transactionContext';
import { useHistory } from 'react-router-dom';

function CreatTransaction(props) {
  const [input, setInput] = useState({
    type: 'EXPENSE',
    payee: '',
    categoryId: '',
    amount: '',
    date: '',
    comment: '',
  });

  const [error, setError] = useState({});

  const [optionExpenses, setOptionExpenses] = useState([]);
  const [optionIncomes, setOptionIncomes] = useState([]);

  const { transactions, setTransactions } = useContext(TransactionContext);

  const history = useHistory();

  const { type, payee, categoryId, amount, date, comment } = input;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categories');
        const expenses = response.data.categories.filter(item => item.type === 'EXPENSE');
        setOptionExpenses(expenses);
        setInput(current => ({ ...current, categoryId: expenses[0].id }));
        setOptionIncomes(response.data.categories.filter(item => item.type === 'INCOME'));
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategory();
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

  //bad version
  // const handleSubmitForm = e => {
  //   e.preventDefault();
  //   const error = validateTransactionObject(input);
  //   setError(error);
  //   const keys = Object.keys(error);
  //   let hasError = false;
  //   for (let i = 0; i <= keys.length; i++) {
  //     if (error[keys] !== '') {
  //       hasError = true;
  //       break;
  //     }
  //   }
  //   if (!hasError) {
  //     //save to api
  //   }
  // };

  // ตัวอย่างการใช้ Object.keys, Object.values และ Object.entries
  //error {payee: 'Payee error', amount: 'Amount error', date: 'Date error'}
  // Object.keys(error); //['payee', 'amount', 'date']
  // Object.values(error); //['Payee error', 'Amount error', 'Date error']
  // Object.entries(error); //[['payee', 'Payee error'], ['amount', 'Amount error'], ['date', 'Date error']]

  //good version
  const handleSubmitForm = async e => {
    e.preventDefault();
    const error = validateTransactionObject(input);
    setError(error);
    if (Object.keys(error).length === 0) {
      //ถ้าไม่มี key error จะ save ไปที่ api
      //save to api
      try {
        const response = await axios.post('http://localhost:8080/transactions', {
          payee: input.payee,
          amount: +input.amount,
          date: input.date,
          categoryId: input.categoryId,
          comment: input.comment,
        });
        //  Method#1 update by calling api
        // const response1 = await axios.get('http://localhost:8080/transactions');
        // setTransactions(
        //   response1.data.transactions.map(item => ({
        //     ...item,
        //     date: new Date(item.date),
        //   }))
        // );

        //  Method#2 update by pure javascript
        const newTransactions = [...transactions];
        const newItem = response.data.transaction;
        newTransactions.push({ ...newItem, date: new Date(newItem.date) }); //เอาไปต่อท้าน array เดิม
        newTransactions.sort((a, b) => {
          if (a.date < b.date) {
            return 1;
          } else {
            return -1;
          }
        });
        setTransactions(newTransactions);

        //  Method#1 Redirect useing props
        // props.history.push('/');

        //  Method#2 Redirect useing history object from useHistory hook
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
          {/* <input type='radio' className='btn-check' id='cbx-expense' name='type' />
          <label
            className='btn btn-outline-danger rounded-0 rounded-start'
            htmlFor='cbx-expense'>
            Expense
          </label>
          <input type='radio' className='btn-check' id='cbx-income' name='type' />
          <label
            className='btn btn-outline-success rounded-0 rounded-end'
            htmlFor='cbx-income'>
            Income
          </label> */}
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
            {/* <Option value='Food'>Food</Option>
            <Option value='Shopping'>Shopping</Option>
            <Option value='Transport'>Transport</Option> */}
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

export default CreatTransaction;
