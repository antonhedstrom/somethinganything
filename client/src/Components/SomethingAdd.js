
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';

import { Button, Input } from '../UIComponents';
import { createSomething } from '../api-services';

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

function SomethingAdd({ ...rest }) {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createSomething, {
    onSuccess: ({ data: createdItem }) => {
      queryClient.setQueryData('somethings', (cachedQuery) => {
        createdItem.Tags = []; // Make sure match cache
        createdItem.Anythings = []; // Make sure match cache
        return {
          ...cachedQuery,
          data: [createdItem, ...cachedQuery.data],
        };
      });
      setTitle('');
    },
  });
  const doSave = useCallback(() => {
    if (isLoading) {
      return;
    }
    mutate({
      title,
    });
  }, [mutate, isLoading, title]);

  const handleOnChange = useCallback((event) => {
    setTitle(event.target.value);
  }, [setTitle]);
  const handleKeyPress = useCallback((event) => {
    const char = event.which || event.charCode;
    switch (char) {
      case 13: // Enter
        doSave();
        break;
      case 27: // Escape
        setTitle('');
        event.target.blur();
        break;
      default:
        break;
    }
  }, [doSave]);

  return (
    <div {...rest}>
      <InputContainer>
        <Input
          block
          className="large"
          value={title}
          onChange={handleOnChange}
          onKeyPress={handleKeyPress}
        />
        <Button
          className="brand"
          size="large"
          onClick={doSave}
          disabled={isLoading}
        >
          Add
        </Button>
      </InputContainer>
    </div>
  );
}

export default SomethingAdd;
