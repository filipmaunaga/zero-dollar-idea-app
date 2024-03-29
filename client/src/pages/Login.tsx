import React, { useState } from 'react';
import { IUserCredentials } from './models/UserCredentialsModel';
import { Typography } from '@mui/material';
import {
  StyledForm,
  StyledFormContainer,
  StyledFormTitle,
  StyledPostContentInput,
  StyledPostTitleInput,
  StyledSubmitButton,
} from './styled/Form';
import { useAuthStore } from '../store/auth/useAuthStore';
import useLogin from '../hooks/useLogin';

const Login = (): JSX.Element => {
  const [userCredentials, setUserCredentials] = useState<IUserCredentials>({
    email: '',
    password: '',
  });
  const [loginUserMutation] = useLogin();
  const user = useAuthStore((state) => state.user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginUserMutation.mutate(userCredentials);
  };

  console.log('user', user);

  return (
    <StyledFormContainer>
      <StyledFormTitle>
        <Typography variant="h6" component="h2" gutterBottom>
          Login
        </Typography>
      </StyledFormTitle>
      <StyledForm onSubmit={handleSubmit}>
        <StyledPostTitleInput
          label="Email"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            setUserCredentials({ ...userCredentials, email: e.target.value });
          }}
          fullWidth
          required
          value={userCredentials.email}
        />

        <StyledPostContentInput
          label="Password"
          type="password"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            setUserCredentials({ ...userCredentials, password: e.target.value });
          }}
          fullWidth
          required
          value={userCredentials.password}
        />
        <StyledSubmitButton
          variant="contained"
          type="submit"
          disabled={loginUserMutation.isLoading}
        >
          Login
        </StyledSubmitButton>
        {loginUserMutation.isError && (
          <p style={{ color: 'red' }}>{(loginUserMutation.error as any).response.data.error}</p>
        )}
      </StyledForm>
    </StyledFormContainer>
  );
};

export default Login;
