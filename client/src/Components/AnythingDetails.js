import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

import ErrorContainer, { parseAxiosError } from '../Containers/Layout/ErrorContainer';
import { getAnything, removeAnything } from '../api-services';
import { Button } from '../UIComponents';

const Type = styled.div`
  color: ${({ theme }) => theme.colors.N60};
`;
const Data = styled.div`
`;

function AnythingDetails({ id, ...rest }) {
  const { isLoading, error, data: { data: anything } = {} } = useQuery(['anything', id], () => getAnything(id));
  const queryClient = useQueryClient();
  const history = useHistory();
  const { mutate: deleteAnything, isLoading: deleting } = useMutation(removeAnything, {
    onSuccess: ({ data: removedItem }) => {
      const removedId = Number.parseInt(removedItem.id, 10);
      queryClient.setQueryData('anythings', (cachedQuery) => {
        return {
          ...cachedQuery,
          data: cachedQuery.data.filter((item) => item.id !== removedId),
        };
      });
      history.goBack();
    },
  });

  const deleteItem = useCallback(() => {
    if (deleting) {
      return;
    }
    deleteAnything(id);
  }, [deleteAnything, deleting, id]);

  if (isLoading) {
    return null;
  }

  if (error) {
    return <ErrorContainer {...parseAxiosError(error)} />;
  }

  return (
    <div {...rest}>
      <Button className="danger u-pull-right" onClick={deleteItem}>Ta bort</Button>
      <h3>{anything.title}</h3>
      <Type>{anything.type}</Type>
      <Data>
        {anything.value1}
        <br />
        {anything.value2}
      </Data>
    </div>
  );
}

export default AnythingDetails;
