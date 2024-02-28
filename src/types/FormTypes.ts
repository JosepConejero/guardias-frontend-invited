// export interface RegisterFormFields {
//   name: string;
//   email: string;
//   password: string;
//   password2: string;
// }

import { ChangeEvent } from "react";

// export interface RegisterFormValidations {
//   name: [FunctionValidation, string];
//   email: [FunctionValidation, string];
//   password: [FunctionValidation, string];
//   password2: [FunctionValidation, string];
// }

export interface LoginFormFields {
  email: string;
  password: string;
}

// export interface PasswordFormFields {
//   password0: string;
//   password: string;
//   password2: string;
// }

// export interface PasswordFormValidations {
//   password0: [FunctionValidation, string];
//   password: [FunctionValidation, string];
//   password2: [FunctionValidation, string];
// }

export interface InitialForm {
  [n: string]: string;
}

export interface FormValidations {
  [name: string]: [FunctionValidation, string];
}

export interface FunctionValidation {
  (value: string): boolean;
}

export interface UseFormArguments {
  initialForm?: InitialForm;
  formValidations?: FormValidations;
}

export interface UseFormReturnValues {
  formState: InitialForm;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onResetForm: () => void;
  isFormValid: boolean;
  // ...formState,
  //  ...formValidation,
  [property: string]: any;

  // [a: string]:
  //   | string
  //   | boolean
  //   | InitialForm
  //   | ((event: ChangeEvent<HTMLInputElement>) => void)
  //   | (() => void);
}
