import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding-top: ${({ theme }) => theme.spacing.medium};
`;

function Main({ children, ...rest }) {
  return (
    <Container className={`container ${rest.className}`} {...rest}>
      {children}
    </Container>
  );
}

Main.defaultProps = {
  className: '',
};

export default Main;
