import styles from './Login.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm as useHookForm } from 'react-hook-form';
import { schema } from './schema';
import { TextInput, PasswordInput, Group, Button, Text } from '@mantine/core';
import { Lock } from 'tabler-icons-react';
import {
  signInWithEmailAndPassword,
  getAuth,
  UserCredential,
} from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { IAuthData } from '../../models/authData';
import { localStorageUtil } from '../../utils/localStorage';
import { useActions } from '../../hooks/redux';
import { useCallback } from 'react';

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const auth = getAuth();
  const { setUser } = useActions();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useHookForm<IAuthData>({
    defaultValues: { email: '', password: '' },
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IAuthData> = useCallback(
    (loginData) => {
      signInWithEmailAndPassword(auth, loginData.email, loginData.password)
        .then((res: UserCredential) => {
          localStorageUtil.setItem({
            key: 'userEmail',
            value: res.user.email!,
          });
          setUser({
            email: res.user.email!,
            auth: true,
          });
          navigate('/dashboard');
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    [auth, navigate, setUser]
  );

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <TextInput
          placeholder="Email"
          label="Email"
          radius="md"
          size="md"
          {...register('email')}
          error={!!errors.email && errors.email?.message}
        />
        <PasswordInput
          size="md"
          radius="md"
          autoComplete="disabled"
          label="Password"
          placeholder="at least 8 characters"
          icon={<Lock size={16} />}
          {...register('password')}
          error={!!errors.password && errors.password?.message}
        />
        <Group position="right" mt="md">
          <Button type="submit" disabled={!isDirty || !isValid}>
            Submit
          </Button>
        </Group>
      </form>
      <Link to="/signup">
        <Text>Don't have an account? Sign Up</Text>
      </Link>
    </div>
  );
};
