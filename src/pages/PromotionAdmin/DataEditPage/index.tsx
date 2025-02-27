import Navigation from '@/components/PromotionAdmin/DataEdit/Navigation';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const index = () => {
  return (
    <>
      <Navigation />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default index;

const Layout = styled.div`
  margin-top: 60px;
`;
