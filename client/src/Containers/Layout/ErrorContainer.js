import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: ${({ theme }) => theme.color.danger};
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px ${({ theme }) => theme.color.danger} solid;
`;

export function parseAxiosError(axiosError) {
  const { response } = axiosError;
  return {
    name: `${response.status}: ${response.statusText}`,
    message: `${response.config.method.toUpperCase()}: ${response.config.url}`,
  };
}

function ErrorContainer({ name, message, details, ...rest }) {
  return (
    <Container {...rest}>
      {name && <h3>{name}</h3>}
      {message && <p>{message}</p>}
      {details && <code>{details.toString()}</code>}
    </Container>
  );
}

export default ErrorContainer;
