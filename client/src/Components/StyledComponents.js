import styled from 'styled-components';

export const TagTile = styled.span`
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  background-color: ${({ color }) => color};
  color: black;
`;

export const DataText = styled.td`
  font-family: Courier;
`;
