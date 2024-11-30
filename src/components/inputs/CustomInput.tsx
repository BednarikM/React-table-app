/* Internal *******************************************************************/
import { TCustomInput } from "../../typescript/schemasAndTypes";

/* Styles *********************************************************************/
import "../../styles/components/inputs/CustomInput.scss";

/* Component FNC **************************************************************/
export default function CustomInput({
  type = "text",
  id,
  name,
  label,
  value,
  required = true,
  handleInputChange,
  error,
}: TCustomInput): JSX.Element {
  /* Jsx **********************************************************************/
  return (
    <div className="custom-input">
      <label className={"custom-input__label"} htmlFor={id}>
        {label}
        {required && <span className="custom-input__required">*</span>}
      </label>
      <input
        className={"custom-input__element"}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleInputChange}
      />
      {error && (
        <div className="custom-input__error">
          <p className="custom-input__error-text">{error}</p>
        </div>
      )}
    </div>
  );
}
