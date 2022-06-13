import { ISignUpProps } from "./SignUp.props";
import styles from "./SignUp.module.scss";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { IForm } from "../../models/types";
import { SubmitHandler, useForm as useHookForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput, PasswordInput, Group, Button, Text } from "@mantine/core";
import { Lock } from "tabler-icons-react";
import { schema } from "./schema";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { setUser } from "../../store/slices/userSlice";

export const SignUp = ({}: ISignUpProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useHookForm<IForm>({
    defaultValues: { email: "", password: "" },
    mode: "all",
    resolver: yupResolver(schema),
  });
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = getAuth();

  const onSubmit: SubmitHandler<IForm> = (signUpData) => {
    createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password)
      .then((res: any) => {
        sessionStorage.setItem("userEmail", res.user.email!);
        dispatch(
          setUser({
            email: res.user.email,
          })
        );
        navigate("/dashboard");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ textAlign: "center" }}>SignUp</h1>
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
      <Link to="/login">
        <Text>Login</Text>
      </Link>
    </div>
  );
};
