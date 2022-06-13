import styles from "./Login.module.scss";
import { ILoginProps } from "./Login.props";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm as useHookForm } from "react-hook-form";
import { schema } from "./schema";
import { TextInput, PasswordInput, Group, Button, Text } from "@mantine/core";
import { Lock } from "tabler-icons-react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { IForm } from "../../models/types";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { setUser } from "../../store/slices/userSlice";

export const Login = ({}: ILoginProps): JSX.Element => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useHookForm<IForm>({
    defaultValues: { email: "", password: "" },
    mode: "all",
    resolver: yupResolver(schema),
  });

  const auth = getAuth();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IForm> = (loginData) => {
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((res: any) => {
        localStorage.setItem("userEmail", res.user.email!);
        dispatch(
          setUser({
            email: res.user.email,
          })
        );
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <TextInput
          placeholder="Email"
          label="Email"
          radius="md"
          size="md"
          {...register("email")}
          error={!!errors.email && errors.email?.message}
        />
        <PasswordInput
          size="md"
          radius="md"
          autoComplete="disabled"
          label="Password"
          placeholder="at least 8 characters"
          icon={<Lock size={16} />}
          {...register("password")}
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
