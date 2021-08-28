import React from "react";
import { Button } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { FormLabel } from "../../components/form-label/form-label.component";
import { login } from "../../redux/user/user.actions";
import { selectUserFetching } from "../../redux/user/user.selectors";
import { loginFormValidationSchema } from "./login-form.data";
import { InputFormik } from "../formik-fields/input.component";

enum LoginFormFields {
  IDENTIFIER = "identifier",
  PASSWORD = "password"
}

export interface LoginFormValues {
  identifier?: string;
  password?: string;
}

export const LoginForm = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector(selectUserFetching);

  const history = useHistory();

  const formik = useFormik<LoginFormValues>({
    initialValues: {},
    onSubmit: async values => {
      try {
        await dispatch(login(values));

        history.push("/");
      } catch (err) {
        //
      }
    },
    validationSchema: loginFormValidationSchema
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormLabel>Username or email</FormLabel>
      <InputFormik
        placeholder="Username or email"
        onChange={formik.handleChange}
        name={LoginFormFields.IDENTIFIER}
        value={formik.values[LoginFormFields.IDENTIFIER]}
        error={formik.errors[LoginFormFields.IDENTIFIER]}
        touched={formik.touched[LoginFormFields.IDENTIFIER]}
      />
      <FormLabel>Password</FormLabel>
      <InputFormik
        placeholder="Password"
        type="password"
        onChange={formik.handleChange}
        name={LoginFormFields.PASSWORD}
        value={formik.values[LoginFormFields.PASSWORD]}
        error={formik.errors[LoginFormFields.PASSWORD]}
        touched={formik.touched[LoginFormFields.PASSWORD]}
      />
      <Button
        htmlType="submit"
        type="primary"
        style={{ marginTop: 16 }}
        block
        loading={isFetching}
      >
        Submit
      </Button>
    </form>
  );
};
