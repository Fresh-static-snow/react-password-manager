import styles from './Footer.module.scss';
import { Text } from '@mantine/core';

export const Footer = (): JSX.Element => {
  return (
    <footer className={styles.container}>
      <Text align="center">
        Copyright Artem Brovko © {new Date().getFullYear()}
      </Text>
    </footer>
  );
};
