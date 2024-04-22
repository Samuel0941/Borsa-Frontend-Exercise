import React, { createContext, useState, useMemo, ReactNode } from "react";

type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  address: string;
  isBuyer: boolean;
  profilePic: string;
  password: string;
  confirmPassword: string;
};

export type StepsCounterType = 0 | 1 | 2;

type ContextType = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  stepsCounter: StepsCounterType;
  setStepsCounter: React.Dispatch<React.SetStateAction<StepsCounterType>>;
};

const initialFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  address: "",
  isBuyer: false,
  profilePic: "",
  password: "",
  confirmPassword: "",
};

export const SignupContext = createContext<ContextType>({
  formData: initialFormValues,
  setFormData: () => {},
  setStepsCounter: () => {},
  stepsCounter: 0,
});

type ProviderProps = {
  children: ReactNode;
};

export const SignupProvider: React.FC<ProviderProps> = ({ children }) => {
  const [stepsCounter, setStepsCounter] = useState<StepsCounterType>(0);
  const [formData, setFormData] = useState<FormDataType>(initialFormValues);

  const contextValue = useMemo<ContextType>(
    () => ({ formData, setFormData, stepsCounter, setStepsCounter }),
    [stepsCounter, formData]
  );

  return (
    <SignupContext.Provider value={contextValue}>
      {children}
    </SignupContext.Provider>
  );
};
