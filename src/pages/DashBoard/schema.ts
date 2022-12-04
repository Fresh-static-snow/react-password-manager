import * as yup from 'yup';

export const schema = yup.object().shape({
  website: yup.string().required('Site is a required field'),
  user: yup
    .string()
    .min(2, 'Username should contain 2-60 characters')
    .max(60, 'Username should contain 2-60 characters')
    .required('Name is a required field'),
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .required('No password provided.'),
});
