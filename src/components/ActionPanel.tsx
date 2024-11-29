/* Third-party ****************************************************************/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faBan, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

/* Internal *******************************************************************/
import { TActionPanel } from "../typescript/schemasAndTypes.ts";
import { FormModalActionEnum } from "../typescript/formModalEnum.ts";

/* Styles *********************************************************************/
import "../styles/components/ActionPanel.scss";

/* Component FNC **************************************************************/
export default function ActionPanel({
  pageRoute,
  item,
  handleActionBtn,
  handleFormModalTrigger,
}: TActionPanel): JSX.Element {
  /* Jsx **********************************************************************/
  return (
    <div className="action-panel">
      {pageRoute === "users" && "banned" in item && (
        <FontAwesomeIcon
          icon={item.banned ? faPlus : faBan}
          onClick={() => handleActionBtn(item.id, "PATCH", { banned: !item.banned })}
        />
      )}
      <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleFormModalTrigger(item, FormModalActionEnum.EDIT)} />
      <FontAwesomeIcon icon={faTrash} onClick={() => handleActionBtn(item.id, "DELETE")} />
    </div>
  );
}
