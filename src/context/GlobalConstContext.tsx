/* React **********************************************************************/
import { createContext } from "react";

/* Internal *******************************************************************/
import { TGlobalConstContext } from "../typescript/schemasAndTypes";

/* Context ********************************************************************/
export const GlobalConstContext = createContext<TGlobalConstContext | null>(null);

/* Provider *******************************************************************/
export const GlobalConstProvider = ({ children }: { children: JSX.Element }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <GlobalConstContext.Provider
      value={{
        apiUrl,
      }}
    >
      {children}
    </GlobalConstContext.Provider>
  );
};
