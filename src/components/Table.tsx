/* React **********************************************************************/
import { useContext, useState, useMemo, useEffect } from "react";

/* Third-party ****************************************************************/
import { useRevalidator } from "react-router-dom";

/* Internal *******************************************************************/
import { FormModalContext } from "../context/FormModalContext";
import { fetchUtil } from "../utils/utils";
import { TRowData, TTable, TRowDataArray } from "../typescript/schemasAndTypes.ts";
import { FormModalActionEnum } from "../typescript/formModalEnum.ts";

/* Components *****************************************************************/
import TableFilter from "./tableParts/TableFilter.tsx";
import TableHeader from "./tableParts/TableHeader.tsx";
import TableBody from "./tableParts/TableBody.tsx";
import FormModal from "./FormModal.tsx";
import SpinningLoader from "./SpinningLoader.tsx";

/* Styles *********************************************************************/
import "../styles/components/Table.scss";

/* Component FNC **************************************************************/
export default function Table({ pageRoute, headers, fetchedData }: TTable): JSX.Element {
  const { formModalOpened, setFormModalOpened, setformModalAction, setRowContextData, defaultRowData } =
    useContext(FormModalContext)!;

  const [filteredProperty, setFilteredProperty] = useState("none");
  const [filterQuery, setFilterQuery] = useState("");

  const revalidator = useRevalidator();
  const { state } = revalidator; // Loader used to display skill and wanted to try it, with the useEffect fetch it would be less pain and faster fetch i guess

  const filteredData = useMemo(() => {
    if (filteredProperty === "none") {
      return fetchedData;
    }

    return fetchedData.filter((item: TRowData) => {
      if (filteredProperty in item) {
        const value = item[filteredProperty as keyof TRowData];
        if (typeof value === "string") {
          return value.toLowerCase().includes(filterQuery.toLowerCase());
        }
      }
    }) as TRowDataArray;
  }, [fetchedData, filteredProperty, filterQuery]);

  const tableRadioOptions = [
    { id: "default", name: "table-filter", label: "None", value: "none" },
    { id: "name", name: "table-filter", label: "Name", value: "name" },
  ];

  /* Hooks ********************************************************************/
  useEffect(() => {
    if (filteredProperty === "none") {
      setFilterQuery("");
    }
  }, [filteredProperty]);

  /* Functions ****************************************************************/
  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilterQuery(event.target.value);
  }

  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilteredProperty(event.target.value);
  }

  function handleFormModalTrigger(rowData: TRowData | null, action: FormModalActionEnum) {
    if (rowData) {
      setRowContextData(rowData);
    } else {
      setRowContextData(defaultRowData[pageRoute]);
    }

    setformModalAction(action);
    setFormModalOpened(true);
  }

  async function handleActionBtn(userId: string, method: "PATCH" | "DELETE", body?: Record<string, any> | undefined) {
    try {
      const url = `https://inqool-interview-api.vercel.app/api/${pageRoute}/${userId}`;
      const data = await fetchUtil<typeof body>(url, method, body);
      revalidator.revalidate();
      console.log("handleActionBtn response", data);
    } catch (error) {
      console.error("Error in handleActionBtn:", error);
    }
  }

  /* Jsx **********************************************************************/
  return (
    <div className="table__wrapper">
      <div className="table">
        {state === "loading" && (
          <div className="table__loader-wrapper">
            <SpinningLoader />
          </div>
        )}
        <TableFilter
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
          filteredProperty={filteredProperty}
          tableRadioOptions={tableRadioOptions}
          handleRadioChange={handleRadioChange}
          handleSearchChange={handleSearchChange}
        />
        <table className="table__content">
          <TableHeader headers={headers} />
          <TableBody
            headers={headers}
            filteredData={filteredData}
            pageRoute={pageRoute}
            handleActionBtn={handleActionBtn}
            handleFormModalTrigger={handleFormModalTrigger}
          />
        </table>
        <button className="table__button-add-row" onClick={() => handleFormModalTrigger(null, FormModalActionEnum.ADD)}>
          Add row
        </button>
        {formModalOpened && <FormModal pageRoute={pageRoute} />}
      </div>
    </div>
  );
}
