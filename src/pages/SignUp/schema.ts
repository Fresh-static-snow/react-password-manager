import * as yup from "yup";
import { emailExpression } from "../../models/regex";

export const schema = yup.object().shape({
  email: yup
    .string()
    .matches(emailExpression, "Email is not correct")
    .email("Email should have correct format")
    .required("Email is a required field"),
  password: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .required("No password provided."),
});
