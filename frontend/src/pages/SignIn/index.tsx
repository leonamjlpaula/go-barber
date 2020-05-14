import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';
import {
  Container,
  Content,
  AnimationContainer,
  ImageBackground,
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      formRef.current?.setErrors({});

      try {
        const schema = Yup.object().shape({
          email: Yup.string().required('Valid e-mail is required').email(),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate(data, { abortEarly: false });
        await signIn({ email: data.email, password: data.password });

        history.push('/dashboard');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Por favor cheque as credenciais',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="logo" />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Faça seu logon</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />
            <Button type="submit">Entrar</Button>
            <a href="forgot">Esqueci minha senha</a>
          </Form>
          <Link to="signup">
            <FiLogIn />
            Criar minha conta
          </Link>
        </AnimationContainer>
      </Content>
      <ImageBackground />
    </Container>
  );
};

export default SignIn;
