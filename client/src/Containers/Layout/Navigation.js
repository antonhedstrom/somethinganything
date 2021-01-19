import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavWrapper = styled.div`
  background-color: #003049;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const NavItem = styled.li`
  font-weight: bold;
  display: inline-block;
  flex-grow: 1;
  text-align: center;
  margin-bottom: 0;

  a {
    display: block;
    padding: ${({ theme }) => theme.spacing.small};
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0.4);
    color: white;

    &:hover {
      background-color: rgba(255, 255, 255, 0.6);
    }

    &.active {
      color: black;
    }
  }
`;

function Navigation({ children, ...rest }) {
  return (
    <NavWrapper {...rest}>
      <NavList className="container">
        <NavItem>
          <NavLink activeClassName="active" to="/somethings">Somethings</NavLink>
        </NavItem>
        <NavItem>
          <NavLink activeClassName="active" to="/anythings">Anythings</NavLink>
        </NavItem>
        <NavItem>
          <NavLink activeClassName="active" to="/tags">Tags</NavLink>
        </NavItem>
      </NavList>
    </NavWrapper>
  );
}

export default Navigation;
