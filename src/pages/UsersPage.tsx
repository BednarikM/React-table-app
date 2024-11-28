/* Third-party ****************************************************************/
import { useLoaderData, useLocation } from "react-router-dom";

/* Internal *******************************************************************/
import { FormModalProvider } from "../context/FormModalContext.tsx";
import { TUser, TPageRoute } from "../typescript/schemasAndTypes.ts";

/* Components *****************************************************************/
import Table from "../components/Table.tsx";

/* Component FNC **************************************************************/
export default function UsersPage(): JSX.Element {
  const data = useLoaderData() as TUser[];
  const location = useLocation();

  const mappedHeaders = ["#", ...Object.keys(data[0]).filter((key) => key !== "id"), "action"] as (
    | keyof TUser
    | "action"
  )[];

  const mappedData = data.map((item, index) => {
    return { ...item, "#": index + 1 };
  });

  /* Jsx **********************************************************************/
  return (
    <div className="table-wrapper">
      <FormModalProvider>
        <Table pageRoute={location.pathname.slice(1) as TPageRoute} headers={mappedHeaders} fetchedData={mappedData} />
      </FormModalProvider>
    </div>
  );
}
