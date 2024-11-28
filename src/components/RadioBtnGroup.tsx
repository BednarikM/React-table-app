/* Internal *******************************************************************/
import { TRadioGroup } from "../typescript/schemasAndTypes";
import { capitalizeFirstLetter } from "../utils/utils";

/* Component FNC **************************************************************/
export default function RadioBtnGroup({
  parentClass,
  options,
  compareValue = "true",
  handleRadioChange,
}: TRadioGroup): JSX.Element {
  /* Jsx **********************************************************************/
  return (
    <div className={`${parentClass}__radio-buttons`}>
      {options.map((option: any) => {
        return (
          <div key={option.id} className={`${parentClass}__radio-buttons-field`}>
            <input
              className={`${parentClass}__radio-buttons-element ${parentClass}__radio-buttons-element--${option.id}`}
              type="radio"
              id={option.id}
              name={option.name}
              value={option.value}
              checked={compareValue === option.value}
              onChange={handleRadioChange}
            />
            <label className={`${parentClass}__radio-buttons-label`} htmlFor={option.id}>
              <span className={`${parentClass}__radio-buttons-label-text`}>{capitalizeFirstLetter(option.label)}</span>
              {option.description && (
                <span
                  className={`${parentClass}__radio-buttons-label-description`}
                >{` ( ${option.description} )`}</span>
              )}
            </label>
          </div>
        );
      })}
    </div>
  );
}
