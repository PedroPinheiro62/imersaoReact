import React from 'react';
import styled, { css } from 'styled-components';
import Footer from '../Footer';
import Menu from '../Menu';

const Main = styled.main`
  background-color: var(--black);
  color: var(--white);
  flex: 1;
  padding-top: 10px;
  padding-left: 5%;
  padding-right: 5%;
  ${({ paddingAll }) => css`
      padding: ${paddingAll};
  `}

  ${({ form }) => form && css`
      max-width: 900px;
      width: 100%;
      margin: auto;
  `}
`;

function PageDefault({ children, paddingAll, form }) {
  return (
    <>
      <Menu />
      <Main paddingAll={paddingAll} form={form}>
        {children}
      </Main>
      <Footer />
    </>
  );
}

export default PageDefault;
