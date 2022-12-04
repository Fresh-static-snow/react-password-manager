import styles from './SignUp.module.scss';
import {
  createUserWithEmailAndPassword,
  getAuth,
  UserCredential,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm as useHookForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput, PasswordInput, Group, Button, Text } from '@mantine/core';
import { Lock } from 'tabler-icons-react';
import { schema } from './schema';
import { IAuthData } from '../../models/authData';
import { useActions } from '../../hooks/redux';
import { localStorageUtil } from '../../utils/localStorage';

export const SignUp = (): JSX.Element => {
  let navigate = useNavigate();
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

  const onSubmit: SubmitHandler<IAuthData> = (signUpData) => {
    createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password)
      .then((res: UserCredential) => {
        localStorageUtil.setItem({ key: 'userEmail', value: res.user.email! });
        setUser({
          email: res.user.email!,
          auth: true,
        });
        navigate('/dashboard');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ textAlign: 'center' }}>SignUp</h1>
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
      <Link to="/login">
        <Text>Login</Text>
      </Link>
    </div>
  );
};
