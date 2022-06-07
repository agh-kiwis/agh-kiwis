import React from 'react';
import { NavBar } from './NavBar';
import { Wrapper } from './Wrapper';

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
