/* React **********************************************************************/
import { useContext, useState } from "react";

/* Third-party ****************************************************************/
import { useRevalidator } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

/* Internal *******************************************************************/
import { FormModalContext } from "../context/FormModalContext";
import { fetchUtil } from "../utils/utils";
import { TUser, TAnimal, UserFormSchema, AnimalFormSchema, TPageRoute, TRowData } from "../typescript/schemasAndTypes";

/* Components *****************************************************************/
import RadioBtnGroup from "./RadioBtnGroup";

/* Styles *********************************************************************/
import "../styles/components/FormModal.scss";

/* Component FNC **************************************************************/
export default function FormModal({ pageRoute }: { pageRoute: TPageRoute }): JSX.Element {
  const { setFormModalOpened, rowContextData, formModalAction } = useContext(FormModalContext)!;

  const [currentRowData, setCurrentRowData] = useState<TRowData>(rowContextData!);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const revalidator = useRevalidator();

  const formModalRadioOptions = [
    { id: "no", name: "banned", label: "No", value: "false", description: "is not banned" },
    { id: "yes", name: "banned", label: "Yes", value: "true", description: "is banned" },
  ];

  /* Functions ****************************************************************/
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setCurrentRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const booleanValue = value === "true";

    setCurrentRowData((prevData) => ({
      ...prevData,
      [name]: booleanValue,
    }));
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>, itemId?: string) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const transformedData = {
      ...data,
      age: Number(data.age),
      ...(pageRoute === "users" && { banned: data.banned === "true" }),
    };

    const schema = pageRoute === "users" ? UserFormSchema : pageRoute === "animals" ? AnimalFormSchema : null;
    if (!schema) {
      console.error(`No validation schema: ${pageRoute}`);
      return;
    }

    const valResult = schema.safeParse(transformedData);

    if (!valResult.success) {
      const errorFields = valResult.error.errors.reduce((acc: Record<string, string>, err) => {
        if (err.path[0]) acc[err.path[0]] = err.message;
        return acc;
      }, {});
      setErrors(errorFields);
      return;
    }

    const { url, method } = itemId
      ? {
          url: `https://inqool-interview-api.vercel.app/api/${pageRoute}/${itemId}`,
          method: "PATCH" as const,
        }
      : {
          url: `https://inqool-interview-api.vercel.app/api/${pageRoute}`,
          method: "POST" as const,
        };

    try {
      const response = await fetchUtil<typeof valResult.data>(url, method, valResult.data);
      revalidator.revalidate();
      console.log("Request successful", response);
    } catch (error) {
      console.error("Request failed", error);
      return;
    } finally {
      setErrors({});
      setFormModalOpened(false);
    }
  }

  /* Jsx **********************************************************************/
  return (
    <div
      className="form-modal__wrapper"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.className === "form-modal__wrapper") setFormModalOpened(false);
      }}
    >
      <div className="form-modal">
        <form className="form-modal__form" onSubmit={(e) => handleFormSubmit(e, currentRowData.id)}>
          <div className="form-modal__input-field form-modal__input-field--name">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={currentRowData?.name} onChange={handleInputChange} />
            {errors.name && (
              <div className="form-modal__field-error">
                <p className="form-modal__field-error-text">{errors.name}</p>
              </div>
            )}
          </div>

          {pageRoute === "users" && (
            <>
              <div className="form-modal__select-field form-modal__select-field--gender">
                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" value={(currentRowData as TUser).gender} onChange={handleInputChange}>
                  <option value="" disabled />
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="others">others</option>
                </select>
                {errors.gender && (
                  <div className="form-modal__field-error">
                    <p className="form-modal__field-error-text">{errors.gender}</p>
                  </div>
                )}
              </div>

              <div className="form-modal__radio-buttons-container">
                <p className="form-modal__radio-buttons-title">Is user banned?</p>
                <RadioBtnGroup
                  parentClass="form-modal"
                  options={formModalRadioOptions}
                  compareValue={(currentRowData as TUser).banned.toString()}
                  handleRadioChange={handleRadioChange}
                />
              </div>
            </>
          )}

          {pageRoute === "animals" && (
            <>
              <div className="form-modal__select-field form-modal__select-field--animal-type">
                <label htmlFor="animal-type">Animal type</label>
                <select
                  name="type"
                  id="animal-type"
                  value={(currentRowData as TAnimal).type}
                  onChange={handleInputChange}
                >
                  <option value="" disabled />
                  <option value="cat">cat</option>
                  <option value="dog">dog</option>
                  <option value="other">other</option>
                </select>
                {errors.type && (
                  <div className="form-modal__field-error">
                    <p className="form-modal__field-error-text">{errors.type}</p>
                  </div>
                )}
              </div>

              <div className="form-modal__input-field form-modal__input-field--age">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={(currentRowData as TAnimal).age}
                  onChange={handleInputChange}
                />
                {errors.age && (
                  <div className="form-modal__field-error">
                    <p className="form-modal__field-error-text">{errors.age}</p>
                  </div>
                )}
              </div>
            </>
          )}

          <button className="form-modal__button-submit" type="submit">
            {formModalAction}
          </button>
        </form>
        <FontAwesomeIcon className="form-modal__button-close" icon={faX} onClick={() => setFormModalOpened(false)} />
      </div>
    </div>
  );
}
