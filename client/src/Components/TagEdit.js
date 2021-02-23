import React, { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { Button, Input, Tag } from '../UIComponents';
import ErrorContainer, { parseAxiosError } from '../Containers/Layout/ErrorContainer';
import { getTag, updateTag } from '../api-services';

const Row = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;
const InlineButton = styled(Button)`
  display: inline-flex;
`;

function TagDetails({ id, ...rest }) {
  const { isLoading, error, data: { data: tag = {} } = {} } = useQuery(['tag', id], () => getTag(id));
  const queryClient = useQueryClient();
  const history = useHistory();
  const { mutate, isSaving } = useMutation(updateTag, {
    onSuccess: ({ data: updatedTag }) => {
      history.goBack();
    },
    onMutate: ({ data: updatedTag }) => {
      queryClient.setQueryData(['tag', id], (cachedQuery) => {
        return {
          ...cachedQuery,
          data: {
            ...cachedQuery.data,
            ...updatedTag,
          },
        };
      });
    },
  });
  const [title, setTitle] = useState('');
  const handleTitleChange = useCallback((event) => {
    const newValue = event.target.value;
    if (newValue !== title) {
      setTitle(newValue);
    }
  }, [setTitle, title]);
  const [color, setColor] = useState('#000000');
  const handleColorChange = useCallback((event) => {
    const newValue = event.target.value;
    if (newValue !== color) {
      setColor(newValue);
    }
  }, [setColor, color]);
  useEffect(() => setTitle(tag.title), [tag.title]);
  useEffect(() => setColor(tag.color), [tag.color]);
  const saveForm = useCallback(() => {
    console.log(title, color);
    mutate({
      id,
      title,
      color,
    });
  }, [mutate, id, color, title]);

  if (isLoading) {
    return null;
  }

  if (error) {
    return <ErrorContainer {...parseAxiosError(error)} />;
  }

  return (
    <div {...rest}>
      <h1>Edit Tag</h1>

      <Row className="container">
        <div className="one-third column">
          Preview
        </div>
        <div className="four columns">
          <Tag color={color}>{title}</Tag>
        </div>
      </Row>
      <Row className="container">
        <div className="one-third column">
          Title
        </div>
        <div className="four columns">
          <Input type="text" value={title} block onChange={handleTitleChange} />
        </div>
      </Row>
      <Row className="container">
        <div className="one-third column">
          Color
        </div>
        <div className="four columns">
          <Input type="color" value={color} block onChange={handleColorChange} />
        </div>
      </Row>
      <Row className="container">
        <div className="one-third column">
          &nbsp;
        </div>
        <div className="two-thirds column">
          <InlineButton
            className="brand"
            onClick={saveForm}
            disabled={isSaving}
          >Save</InlineButton>
          &nbsp;
          <InlineButton
            onClick={() => history.goBack() }
            disabled={isSaving}
          >Cancel</InlineButton>
        </div>
      </Row>

    </div>
  );
}

export default TagDetails;
