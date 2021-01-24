import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
  color: ${({ theme }) => theme.color.N60};
  padding-top: ${({ theme }) => theme.spacing.medium};
  text-align: center;
`;

function Footer({ ...rest }) {
  return (
    <StyledFooter>
      Developed by <a href="https://www.antonhedstrom.se">Anton Hedström</a> 2021.
    </StyledFooter>
  );
}

export default Footer;
