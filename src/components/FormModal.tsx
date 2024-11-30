/* React **********************************************************************/
import { useContext, useEffect, useState } from "react";

/* Third-party ****************************************************************/
import { useRevalidator } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

/* Internal *******************************************************************/
import { FormModalContext } from "../context/FormModalContext";
import { fetchUtil } from "../utils/utils";
import { TUser, TAnimal, UserFormSchema, AnimalFormSchema, TPageRoute, TRowData } from "../typescript/schemasAndTypes";

/* Components *****************************************************************/
import CustomInput from "./inputs/CustomInput";
import SelectInput from "./inputs/SelectInput";
import RadioGroup from "./inputs/RadioGroup";

/* Styles *********************************************************************/
import "../styles/components/FormModal.scss";

/* Component FNC **************************************************************/
export default function FormModal({ pageRoute }: { pageRoute: TPageRoute }): JSX.Element {
  const { setFormModalOpened, rowContextData, formModalAction } = useContext(FormModalContext)!;

  const [currentRowData, setCurrentRowData] = useState<TRowData>(rowContextData!);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const revalidator = useRevalidator();

  const radioGroupOptions = [
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
          <CustomInput
            id="name"
            name="name"
            label="Name"
            value={currentRowData?.name}
            error={errors.name}
            handleInputChange={handleInputChange}
          />

          {pageRoute === "users" && (
            <>
              <SelectInput
                id="gender"
                name="gender"
                label="Gender"
                value={(currentRowData as TUser).gender}
                options={["male", "female", "other"]}
                error={errors.gender}
                handleInputChange={handleInputChange}
              />
              <RadioGroup
                title="Is user banned?"
                options={radioGroupOptions}
                compareValue={(currentRowData as TUser).banned.toString()}
                handleRadioChange={handleRadioChange}
              />
            </>
          )}

          {pageRoute === "animals" && (
            <>
              <SelectInput
                id="type"
                name="type"
                label="Animal-type"
                value={(currentRowData as TAnimal).type}
                options={["cat", "dog", "other"]}
                error={errors.type}
                handleInputChange={handleInputChange}
              />
              <CustomInput
                type="number"
                id="age"
                name="age"
                label="Age"
                value={(currentRowData as TAnimal).age}
                error={errors.age}
                handleInputChange={handleInputChange}
              />
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
