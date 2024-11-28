/* React **********************************************************************/
import { useState } from "react";

/* Third-party ****************************************************************/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

/* Internal *******************************************************************/
import { TTableFilter } from "../typescript/schemasAndTypes.ts";

/* Components *****************************************************************/
import RadioBtnGroup from "./RadioBtnGroup";

/* Styles *********************************************************************/
import "../styles/components/TableFilter.scss";

/* Component FNC **************************************************************/
export default function TableFilter({
  filterQuery,
  filteredProperty,
  tableRadioOptions,
  handleSearchChange,
  handleRadioChange,
}: TTableFilter): JSX.Element {
  const [filtersOpen, setFiltersOpen] = useState(false);

  /* Jsx **********************************************************************/
  return (
    <div className="table-filter">
      <div className="table-filter__header">
        <span className="table-filter__title">Filters</span>
        <span className="table-filter__icon-container" onClick={() => setFiltersOpen((prev) => !prev)}>
          <FontAwesomeIcon icon={filtersOpen ? faChevronUp : faChevronDown} />
        </span>
      </div>
      {filtersOpen && (
        <div className="table-filter__body">
          <div className="table-filter__search-input">
            <input
              className="table-filter__search-input-element"
              type="search"
              value={filterQuery}
              placeholder={filteredProperty === "none" ? "Choose filter" : "Type to filter"}
              disabled={filteredProperty === "none"}
              onChange={handleSearchChange}
            />
          </div>
          <RadioBtnGroup
            parentClass="table-filter"
            options={tableRadioOptions}
            handleRadioChange={handleRadioChange}
            compareValue={filteredProperty}
          />
        </div>
      )}
    </div>
  );
}