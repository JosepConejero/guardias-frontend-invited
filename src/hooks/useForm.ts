/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  FormValidations,
  InitialForm,
  UseFormReturnValues,
} from "../types/FormTypes";

interface FormCheckedValues {
  [n: string]: null | string;
}

export const useForm = (
  initialForm: InitialForm = {} as InitialForm,
  formValidations: FormValidations = {} as FormValidations
): UseFormReturnValues => {
  const [formState, setFormState] = useState<InitialForm>(initialForm);
  const [formValidation, setFormValidation] = useState<FormCheckedValues>(
    {} as FormCheckedValues
  );

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid: boolean = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  //const onInputChange = ({target}): void => {
  const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = (): void => {
    setFormState(initialForm);
  };

  const createValidators = (): void => {
    const formCheckedValues: FormCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidation,
    isFormValid,
  };
};
