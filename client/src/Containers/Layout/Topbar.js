import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1em 0 0;
  background-color: #003049;
  background-image: url("/hero.jpg");
  background-size: cover;
  background-position: center;
  color: white;
`;

const Title = styled.h1`
  font-family: Courier;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoint.medium}) {
    font-size: 2rem;
  }
`;

const SubTitle = styled.span`
  font-size: 0.8em;
  opacity: 0.6;
`;

function Topbar({ children, ...rest }) {
  return (
    <Container {...rest}>
      <div className="container">
        <Title>Something <SubTitle>relates to</SubTitle> Anything</Title>

        {children}
      </div>
    </Container>
  );
}

export default Topbar;
