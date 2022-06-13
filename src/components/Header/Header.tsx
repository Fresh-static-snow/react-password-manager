import styles from "./Header.module.scss";
import { Button, Text } from "@mantine/core";
import { useAuth } from "../../hooks/use-auth";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { removeUser } from "../../store/slices/userSlice";

export const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { email } = useAuth();

  return (
    <header className={styles.container}>
      {email ?? <Text className={styles.login}>Please login to store...</Text>}
      {email ? (
        <Button
          className={styles.btn}
          onClick={() => {
            dispatch(removeUser());
            localStorage.removeItem("userEmail");
          }}
        >
          Log Out
        </Button>
      ) : (
        <></>
      )}
    </header>
  );
};
