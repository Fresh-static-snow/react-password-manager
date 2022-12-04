import styles from './Header.module.scss';
import { Button, Text } from '@mantine/core';
import { useActions, useTypedSelector } from '../../hooks/redux';
import { localStorageUtil } from '../../utils/localStorage';

export const Header = (): JSX.Element => {
  const { removeUser } = useActions();
  const { email } = useTypedSelector((state) => state.user);

  return (
    <header className={styles.container}>
      {email ? (
        <Button
          className={styles.btn}
          onClick={() => {
            removeUser();
            localStorageUtil.removeItem({ key: 'userEmail' });
          }}
        >
          Log Out
        </Button>
      ) : (
        <Text className={styles.login}>Please login to store...</Text>
      )}
    </header>
  );
};
