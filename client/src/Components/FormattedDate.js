import React from 'react';

function FormattedDate({ value, ...rest }) {
  let result = '';
  if (value) {
    try {
      const date = new Date(value);
      result = date.toLocaleString("sv");
    } catch (e) {
      console.error('<Date>: Unable to parse value: ', value);
    }
  }

  return <span {...rest}>{result}</span>;
}

export default FormattedDate;
