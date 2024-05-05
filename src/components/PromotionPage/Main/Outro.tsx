import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getClientLogoImgList } from '@/apis/PromotionPage/client';
import ClientRowAnimation from '../Client/ClientRowAnimation';
import WorkWithUs from '../WorkWithUs/WorkWithUs';

const Outro = () => {
  const { data, isLoading, error } = useQuery<string[], Error>(['clientLogoImgList'], getClientLogoImgList, {
    staleTime: 1000 * 60 * 10,
  });

  return (
    <Container>
      <ClientRowAnimation data={data} isLoading={isLoading} error={error} />
      <WorkWithUs />
    </Container>
  );
};

export default Outro;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
