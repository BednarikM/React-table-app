/* Internal *******************************************************************/
import { TRadioGroup } from "../../typescript/schemasAndTypes";
import { capitalizeFirstLetter } from "../../utils/utils";

/* Styles *********************************************************************/
import "../../styles/components/inputs/RadioGroup.scss";

/* Component FNC **************************************************************/
export default function RadioGroup({
  title,
  options,
  compareValue = "true",
  handleRadioChange,
}: TRadioGroup): JSX.Element {
  /* Jsx **********************************************************************/
  return (
    <div className="radio-group">
      {title && <p className="radio-group__title">{title}</p>}

      <div className="radio-group__content">
        {options.map((option: any) => {
          return (
            <div key={option.id} className="radio-group__field">
              <input
                className={`radio-group__element radio-group__element--${option.id}`}
                type="radio"
                id={option.id}
                name={option.name}
                value={option.value}
                checked={compareValue === option.value}
                onChange={handleRadioChange}
              />
              <label className="radio-group__label" htmlFor={option.id}>
                <span className="radio-group__label-text">{capitalizeFirstLetter(option.label)}</span>
                {option.description && (
                  <span className="radio-group__label-description">{` ( ${option.description} )`}</span>
                )}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
