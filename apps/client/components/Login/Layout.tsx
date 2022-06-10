import React from 'react';
import { Wrapper } from '../Containers/Wrapper';
import { NavBar } from './NavBar';

interface WrapperProps {
  children: React.ReactNode;
}

export const Layout: React.FC<WrapperProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Wrapper>{children}</Wrapper>
    </>
  );
};
