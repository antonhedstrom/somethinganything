import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import ErrorContainer, { parseAxiosError } from '../Containers/Layout/ErrorContainer';
import { getAnything } from '../api-services';

const Type = styled.div`
  color: ${({ theme }) => theme.color.N60};
`;
const Data = styled.div`
`;

function AnythingDetails({ id, ...rest }) {
  const { isLoading, error, data: { data: anything } = {} } = useQuery(['anything', id], () => getAnything(id));

  if (isLoading) {
    return null;
  }

  if (error) {
    return <ErrorContainer {...parseAxiosError(error)} />;
  }

  return (
    <div {...rest}>
      <h3>{anything.title}</h3>
      <Type>{anything.type}</Type>
      <Data>
        {anything.value1}
          &nbsp;
        {anything.value2}
      </Data>
    </div>
  );
}

export default AnythingDetails;
