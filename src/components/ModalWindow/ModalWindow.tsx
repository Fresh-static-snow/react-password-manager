import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Group,
  Modal,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { Id, Lock, World } from 'tabler-icons-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IWebsitePassword } from '../../models/websitePassword';
import { schema } from './schema';
import { IModalWindow } from './ModalWindow.types';
import { useActions, useTypedSelector } from '../../hooks/redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePasswordService } from '../../hooks/usePasswordService';

export const ModalWindow = ({ open, onClose, id, refetch }: IModalWindow) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { password, user, website } = useTypedSelector(
    (state) => state.password
  );
  const { setWebsitePassword } = useActions();
  const { add, update } = usePasswordService();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IWebsitePassword>({
    defaultValues: { website: website, user: user, password: password },
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IWebsitePassword> = useCallback(
    async (newPassword) => {
      setLoading(true);
      if (id && id !== '') {
        await update(id, newPassword);
      } else {
        await add(newPassword);
      }
      refetch();
      setWebsitePassword({ password: '', user: '', website: '' });
      reset();
      setLoading(false);
      onClose();
    },
    [add, id, onClose, refetch, reset, setWebsitePassword, update]
  );

  useEffect(() => {
    reset({ password, user, website });
  }, [password, reset, user, website]);

  return (
    <Modal
      closeOnClickOutside
      opened={open}
      onClose={onClose}
      title="Enter password!"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            required
            autoComplete="disabled"
            placeholder="https://example.com"
            label="Site"
            icon={<World size={16} />}
            {...register('website')}
            error={!!errors.website && errors.website?.message}
          />
          <TextInput
            required
            autoComplete="disabled"
            placeholder="example@mail.com"
            label="Username"
            icon={<Id size={16} />}
            {...register('user')}
            error={!!errors.user && errors.user?.message}
          />
          <PasswordInput
            required
            autoComplete="disabled"
            placeholder="********"
            label="Password"
            icon={<Lock size={16} />}
            {...register('password')}
            error={!!errors.password && errors.password?.message}
          />
        </Stack>
        <Group position="right" mt="md">
          <Button type="reset" loading={loading}>
            Reset
          </Button>
          <Button type="submit" disabled={!isValid} loading={loading}>
            Submit
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
