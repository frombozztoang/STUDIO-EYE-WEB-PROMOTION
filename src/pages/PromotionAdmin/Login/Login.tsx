import { login } from '@/apis/PromotionAdmin/login';
import { authState } from '@/recoil/atoms';
import { loginType } from '@/types/PromotionAdmin/login';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import LoginComponent from '@/components/PromotionPage/Login/Login';
import { PA_ROUTES } from '@/constants/routerConstants';
import BackgroundYellowCircle from '@/components/BackgroundYellowCircle/BackgroundYellowCircle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const setAuth = useSetRecoilState(authState);
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const formData = { email, pwd };
      console.log('보내는 데이터', formData);
      const response = await login(formData);

      if (response.approved) {
        setAuth({ accessToken: response.accessToken, userId: response.id });
        window.alert('로그인 성공');
        navigate(PA_ROUTES.HOME); // approved가 true일 경우에만 홈으로 이동합니다.
      } else {
        // approved가 false일 경우
        throw new Error('승인되지 않은 계정입니다.');
      }
    } catch (error) {
      const errorMessage = '로그인에 실패했습니다. 다시 시도해주세요.';
      window.alert(errorMessage);
      console.log('Login 실패', error);
    }
  };
  return (
    <Container>
      <BackgroundYellowCircle>
        <LoginComponent email={email} setEmail={setEmail} pwd={pwd} setPwd={setPwd} handleLogin={handleLogin} />
      </BackgroundYellowCircle>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
