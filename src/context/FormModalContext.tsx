import { createContext, useState } from "react";
import { TRowData, TformModalAction, TFormModalContext } from "../typescript/schemasAndTypes";

/* DEFAULT ROW DATA ***********************************************************/
const defaultRowData: TFormModalContext["defaultRowData"] = {
  users: {
    id: "",
    name: "",
    gender: "",
    banned: false,
  },
  animals: {
    id: "",
    name: "",
    type: "",
    age: 0,
  },
};

/* CONTEXT ********************************************************************/
export const FormModalContext = createContext<TFormModalContext | null>(null);

/* PROVIDER *******************************************************************/
export const FormModalProvider = ({ children }: { children: JSX.Element }) => {
  const [formModalOpened, setFormModalOpened] = useState(false);
  const [formModalAction, setformModalAction] = useState<TformModalAction>("");
  const [rowContextData, setRowContextData] = useState<TRowData | null>(null);

  return (
    <FormModalContext.Provider
      value={{
        formModalOpened,
        setFormModalOpened,
        formModalAction,
        setformModalAction,
        defaultRowData,
        rowContextData,
        setRowContextData,
      }}
    >
      {children}
    </FormModalContext.Provider>
  );
};
