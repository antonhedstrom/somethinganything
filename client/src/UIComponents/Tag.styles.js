import styled, { css } from 'styled-components';

import { getFontColor } from '../constants';

export const StyledTagList = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

export const DeleteButton = styled.div`
  z-index: 10;
  position: absolute;
  right: 0;
  top: 0;
  width: 1.6em;
  height: 1.6em;
  text-align: center;
  border-radius: 50%;
`;

export const StyledTag = styled.div`
  display: inline-block;
  position: relative;
  border-radius: 5px;
  background-color: ${({ theme, color }) => color || theme.colors.N60};
  color: ${({ theme, color }) => getFontColor(color || theme.colors.N60)};
  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          font-size: 10px;
          padding: 5px 10px;
        `;
      case 'large':
        return css`
          font-size: 16px;
          padding: 10px 20px;
        `;
      case 'medium':
      default:
        return css`
          font-size: 14px;
          padding: 8px 14px;
        `;
    }
  }};

  ${DeleteButton} {
    background-color: ${({ theme, color }) => color || theme.colors.N60};
    color: ${({ theme, color }) => getFontColor(color || theme.colors.N60)};

    transition: transform 250ms ease-out, opacity 200ms;
    opacity: 0;
    transform: translate(20%, -20%);
  }
  &:hover {
    cursor: ${({ onClick }) => onClick && 'pointer'};
    ${DeleteButton} {
      opacity: 1;
      transform: translate(40%, -40%);
    }
  }
`;
