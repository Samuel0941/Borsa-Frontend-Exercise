import { ReactNode, createContext, useMemo, useState } from "react";
import { Colors } from "../constants/colors";

type Severity = "success" | "error" | "info" | "warning";

type PayloadType = {
  severity: Severity;
  message: string;
  open: boolean;
  position: "top" | "bottom";
};

type ContextType = {
  state: PayloadType;
  setState: React.Dispatch<React.SetStateAction<PayloadType>>;
};

const initialValue: PayloadType = {
  open: false,
  message: "",
  severity: "info",
  position: "bottom",
};

export const NotificationContext = createContext<ContextType>({
  state: initialValue,
  setState: () => {},
});

type ProviderProps = {
  children: ReactNode;
};

export const NotificationProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, setState] = useState<PayloadType>(initialValue);

  const contextValue = useMemo<ContextType>(
    () => ({ state, setState }),
    [state]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const NotificationColors = (severity: Severity) => {
  return {
    ["success"]: {
      background: "#047857",
      message: "#D1FAE5",
    },
    ["error"]: {
      background: "#B91C1C",
      message: "#FEE2E2",
    },
    ["info"]: {
      background: "#60328C",
      message: "#E8DBF9",
    },
    ["warning"]: {
      background: "#D4B106",
      message: "#FEFFE6",
    },
  }[severity];
};
