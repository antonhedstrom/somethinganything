import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
  color: ${({ theme }) => theme.colors.N60};
  padding-top: ${({ theme }) => theme.spacing.medium};
  padding-bottom: ${({ theme }) => theme.spacing.large};
  text-align: center;
`;

function Footer({ ...rest }) {
  return (
    <StyledFooter>
      Developed by <a href="https://antonhedstrom.se">Anton Hedström</a> 2021.
    </StyledFooter>
  );
}

export default Footer;
