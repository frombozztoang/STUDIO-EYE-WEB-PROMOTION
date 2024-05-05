import React, { useEffect } from 'react';
import { Box, BoxProps, Flex, FlexProps } from '@chakra-ui/react';
import { motion, Variants, useTransform, MotionValue, useSpring } from 'framer-motion';
import styled from 'styled-components';
import index from '@/pages/PromotionAdmin/HomePage';
import { MotionBox } from '@/pages/PromotionPage/Main/MainPage';
import { ppHeaderScrolledState } from '@/recoil/atoms';
import { useSetRecoilState } from 'recoil';

interface SectionProps {
  elementHeight: number;
  index: number;
  scroll: MotionValue<number>;
  data: {
    backgroundImg: string;
    title: string;
    client: string;
    overview: string;
  };
}

const ArtworkList = React.forwardRef<HTMLElement, SectionProps>(({ elementHeight, index, scroll, data }, ref) => {
  const MotionBox = motion<BoxProps>(Box);
  const MotionFlex = motion<FlexProps>(Flex);
  const cardInView: Variants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
    },
  };
  const transformY = useTransform(
    scroll,
    [elementHeight * (index + 1) - elementHeight, elementHeight * (index + 1)],
    ['0vh', '100vh'],
  );

  // TODO 마지막 요소에서 스크롤 자연스럽게 넘어가게 하기
  return (
    <MotionBox
      w='100%'
      h='90%'
      scrollSnapAlign='center'
      initial='offscreen'
      whileInView='onscreen'
      position='relative'
      viewport={{ once: false, amount: 0.7 }}
      ref={ref}
      zIndex={index + 1}
      backgroundImage={`url(${data.backgroundImg})`}
      backgroundSize='cover'
      backgroundPosition='center'
      opacity={0.8}
    >
      <MotionFlex
        w='100%'
        h='90%'
        paddingLeft={100}
        paddingTop={150}
        color='white'
        style={{ y: transformY }}
        alignItems='start'
        justifyContent='start'
      >
        <motion.div variants={cardInView}>
          <ClientWrapper>{data.client}</ClientWrapper>
          <TitleWrapper>{data.title}</TitleWrapper>
          <OverviewWrapper>{data.overview}</OverviewWrapper>
        </motion.div>
      </MotionFlex>
    </MotionBox>
  );
});

export default ArtworkList;
const TitleWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 50px;
  color: white;
  white-space: nowrap;
`;
const ClientWrapper = styled(motion.h2)`
  font-family: 'pretendard-bold';
  font-size: 25px;
  color: #cccccc;
`;
const OverviewWrapper = styled.div`
  font-family: 'pretendard-medium';
  font-size: 20px;
  color: white;
`;
