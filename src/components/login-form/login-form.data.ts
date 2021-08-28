import * as Yup from "yup";
import { LoginFormValues } from "./login-form.component";

export const loginFormValidationSchema = Yup.object().shape<LoginFormValues>({
  identifier: Yup.string().required("Required!"),
  password: Yup.string().required("Required!")
});
