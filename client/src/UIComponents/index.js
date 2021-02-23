import styled from 'styled-components';

import Button from './Button';
import Input from './Input';
import Tag, { TagList } from './Tag';
import Badge, { BadgeList } from './Badge';
import Spinner from './Spinner';


export const DataText = styled.td`
  font-family: Courier;
`;

export const StyledDate = styled.span`
  color: ${({ theme }) => theme.colors.N60};
`;

export {
  Button,
  Input,
  Tag, TagList,
  Badge, BadgeList,
  Spinner,
};
