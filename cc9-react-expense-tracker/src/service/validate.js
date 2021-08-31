// import validator from 'validator';
import { isEmpty, isNumeric } from 'validator';

const validateTransactionField = (value, fieldName) => {
  switch (fieldName) {
    case 'payee': {
      if (isEmpty(value)) {
        return 'Payee is required';
      }
      return '';
    }
    case 'amount': {
      if (isEmpty(value)) {
        return 'Amount is required';
      }
      if (!isNumeric(value)) {
        return 'Amount must be a number';
      }
      if (value < 0) {
        return 'Amount must be greater than 0';
      }
      return '';
    }
    case 'date': {
      if (isEmpty(value)) {
        return 'Date is required';
      }
      return '';
    }
    default:
      return '';
  }
};

const validateTransactionObject = value => {
  //value => {payee: '', amount: '', date: '',type: '', categoryId: '',comment: ''}
  const errorPayee = validateTransactionField(value.payee, 'payee');
  const errorAmount = validateTransactionField(value.amount, 'amount');
  const errorDate = validateTransactionField(value.date, 'date');
  const error = {};
  if (errorPayee) {
    error.payee = errorPayee;
  }
  if (errorAmount) {
    error.amount = errorAmount;
  }
  if (errorDate) {
    error.date = errorDate;
  }
  return error; //{return เฉพาะค่า key ที่มี error เท่านั้น }
  //เดิม error เป็น object เปล่า เมื่อเงื่อนไขมี error จะเพิ่ม key กับ ค่า ไปใน error{}
  // const payee = validateTransactionField(value.payee, 'payee');
  // const amount = validateTransactionField(value.amount, 'amount');
  // const date = validateTransactionField(value.date, 'date');
  // return { payee, amount, date };
};

export { validateTransactionField, validateTransactionObject };
