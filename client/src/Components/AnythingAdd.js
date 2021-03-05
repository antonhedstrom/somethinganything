
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMutation } from 'react-query';

import { Button, Input } from '../UIComponents';
import { createAnything } from '../api-services';

const InputContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;

  @media (max-width: 599px) {
    width: 100%;
  }
`;

function AnythingAdd({ somethingId, onComplete, ...rest }) {
  const [type, setType] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const { mutate, isLoading } = useMutation(createAnything, {
    onSuccess: ({ data: createdItem }) => {
      setType('');
      setValue1('');
      setValue2('');
      onComplete(createdItem);
    },
  });

  const onChangeType = useCallback((event) => {
    setType(event.target.value);
  }, [setType]);
  const onChangeValue1 = useCallback((event) => {
    setValue1(event.target.value);
  }, [setValue1]);
  const onChangeValue2 = useCallback((event) => {
    setValue2(event.target.value);
  }, [setValue2]);

  const doSave = useCallback(() => {
    if (isLoading) {
      return;
    }
    mutate({
      type,
      value1,
      value2,
      SomethingId: somethingId,
    });
  }, [mutate, isLoading, somethingId, type, value1, value2]);

  return (
    <div {...rest}>
      <InputContainer>
        <Input
          className="input"
          value={type}
          onChange={onChangeType}
        />
        <Input
          className="input"
          value={value1}
          onChange={onChangeValue1}
        />
        <Input
          className="input"
          value={value2}
          onChange={onChangeValue2}
        />

        <Button
          className="brand"
          onClick={doSave}
          disabled={isLoading}
        >
          Add
        </Button>
      </InputContainer>
    </div>
  );
}

AnythingAdd.defaultProps = {
  onComplete: () => {},
};

AnythingAdd.propTypes = {
  onComplete: PropTypes.func,
};

export default AnythingAdd;
