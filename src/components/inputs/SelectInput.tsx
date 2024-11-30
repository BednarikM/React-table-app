/* Internal *******************************************************************/
import { TSelectInput } from "../../typescript/schemasAndTypes";

/* Styles *********************************************************************/
import "../../styles/components/inputs/SelectInput.scss";

export default function SelectInput({
  id,
  name,
  label,
  value,
  options,
  required = true,
  handleInputChange,
  error,
}: TSelectInput): JSX.Element {
  return (
    <div className="select-input">
      <label className="select-input__label" htmlFor={id}>
        {label}
        {required && <span className="select-input__required">*</span>}
      </label>
      <select className="select-input__element" name={name} id={id} value={value} onChange={handleInputChange}>
        <option value="" disabled />
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      {error && (
        <div className="select-input__error">
          <p className="select-input__error-text">{error}</p>
        </div>
      )}
    </div>
  );
}
