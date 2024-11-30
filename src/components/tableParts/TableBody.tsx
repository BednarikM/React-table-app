/* Internal *******************************************************************/
import { TUser, TAnimal, TTableBody } from "../../typescript/schemasAndTypes.ts";

/* Components *****************************************************************/
import TableAction from "./TableAction.tsx";

/* Component FNC **************************************************************/
export default function TableBody({
  headers,
  filteredData,
  pageRoute,
  handleActionBtn,
  handleFormModalTrigger,
}: TTableBody): JSX.Element {
  /* Functions ****************************************************************/
  function getBannedClassName(key: string, item: TUser | TAnimal): string {
    if (key === "banned") {
      const booleanValue = item[key as keyof typeof item];
      return `table__banned ${booleanValue ? "table__banned--true" : "table__banned--false"}`;
    }
    return "";
  }

  /* Jsx **********************************************************************/
  return (
    <tbody className="table__body">
      {filteredData.map((item: TUser | TAnimal) => (
        <tr key={item.id}>
          {headers.map((key: string) => {
            if (key === "action") {
              return (
                <td key={key} className="table__action-panel">
                  <TableAction
                    pageRoute={pageRoute}
                    item={item}
                    handleActionBtn={handleActionBtn}
                    handleFormModalTrigger={handleFormModalTrigger}
                  />
                </td>
              );
            }

            if (key === "banned") {
              return (
                <td key={key} className={getBannedClassName(key, item)}>
                  <span className="table__banned-shape" />
                </td>
              );
            }

            return <td key={key}>{item[key as keyof typeof item]}</td>;
          })}
        </tr>
      ))}
    </tbody>
  );
}
