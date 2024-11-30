import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { FormModalActionEnum } from "./formModalEnum";

/* BASE SCHEMA ****************************************************************/
const BaseDataSchema = z.object({
  id: z.string({ message: "id must be a string" }),
  name: z.string({ message: "Name must be a string" }),
});

/**/
/**/
/**/
/**/

/* USER ***********************************************************************/
/* USER SCHEMA ****************************************************************/

export const UserSchema = BaseDataSchema.extend({
  gender: z
    .string()
    .default("")
    .refine((val) => val !== "" && ["female", "male", "other"].includes(val), {
      message: "Value must be one of 'female', 'male', or 'other'",
    }),
  banned: z.boolean({ message: "Value must be selected" }).default(false),
});

export const UserArraySchema = UserSchema.array();

export const UserFormSchema = UserSchema.omit({ id: true }).extend({
  name: z
    .string({ message: "Name must be a string" })
    .min(3, {
      message: "Must be at least 3 characters long",
    })
    .regex(/^[a-zA-Z\s.'-]*$/, {
      message: "Name contains invalid character",
    }),
});

/* USER TYPE ******************************************************************/
export type TUser = z.infer<typeof UserSchema>;
export type TUserForm = z.infer<typeof UserFormSchema>;

/**/
/**/
/**/
/**/

/* ANIMAL *********************************************************************/
/* ANIMAL SCHEMA **************************************************************/

export const AnimalSchema = BaseDataSchema.extend({
  type: z
    .string()
    .default("")
    .refine((val) => val !== "" && ["cat", "dog", "other"].includes(val), {
      message: "Value must be one of 'cat', 'dog', or 'other'",
    }),
  age: z.number({ message: "Age must be a number" }).min(0).max(80),
});

export const AnimalArraySchema = AnimalSchema.array();

export const AnimalFormSchema = AnimalSchema.omit({ id: true }).extend({
  name: z
    .string({ message: "Name must be a string" })
    .min(3, {
      message: "Must be at least 3 characters long",
    })
    .regex(/^[a-zA-Z\s.'-]*$/, { message: "Name contains invalid character" }),
});

/* ANIMAL TYPE ****************************************************************/
export type TAnimal = z.infer<typeof AnimalSchema>;
export type TAnimalForm = z.infer<typeof AnimalFormSchema>;

/**/
/**/
/**/
/**/

/* TYPES **********************************************************************/
/* TYPE ROW DATA **************************************************************/
export type TRowData = TUser | TAnimal;
export type TRowDataArray = TUser[] | TAnimal[];
export type TDefaultRowDataObject = { users: TUser; animals: TAnimal };
export type TContextRowData = TRowData | null;

/* TYPE PAGE ROUTE ************************************************************/
export type TPageRoute = "users" | "animals";

/* TYPE RADIO GROUP ***********************************************************/
export type TRadioOption = {
  id: string;
  name: string;
  label: string;
  value: string;
  description?: string;
};

export type TRadioGroup = {
  title?: string;
  options: TRadioOption[];
  compareValue?: string;
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/* TYPE TABLE *****************************************************************/
export type TTable = {
  pageRoute: TPageRoute;
  headers: (keyof TUser | keyof TAnimal | "action")[];
  fetchedData: TRowDataArray;
};

export type TTableFilter = {
  filterQuery: string;
  setFilterQuery: Dispatch<SetStateAction<TTableFilter["filterQuery"]>>;
  filteredProperty: string;
  tableRadioOptions: TRadioOption[];
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type TTableBody = {
  headers: string[];
  filteredData: TRowDataArray;
  pageRoute: TPageRoute;
  handleActionBtn: (id: string, method: "PATCH" | "DELETE", body?: object) => void;
  handleFormModalTrigger: (rowData: TRowData, action: FormModalActionEnum) => void;
};

/* TYPE INPUTS *****************************************************************/
type TBaseInput = {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
};

export type TCustomInput = TBaseInput & {
  type?: string;
  value: string | number;
};

export type TSelectInput = TBaseInput & {
  value: string;
  options: string[];
};

/* TYPE FORM ACTION ***********************************************************/
export type TTableAction = {
  pageRoute: string;
  item: TRowData;
  handleActionBtn: (id: string, method: "PATCH" | "DELETE", body?: object) => void;
  handleFormModalTrigger: (rowData: TRowData, action: FormModalActionEnum) => void;
};

/* TYPE FORM ACTION ***********************************************************/
export type TformModalAction = FormModalActionEnum | "";

/* TYPE FORM MODAL CONTEXT ****************************************************/
export type TFormModalContext = {
  formModalOpened: boolean;
  setFormModalOpened: Dispatch<SetStateAction<TFormModalContext["formModalOpened"]>>;
  formModalAction: TformModalAction;
  setformModalAction: Dispatch<SetStateAction<TFormModalContext["formModalAction"]>>;
  rowContextData: TContextRowData;
  setRowContextData: Dispatch<SetStateAction<TFormModalContext["rowContextData"]>>;
  defaultRowData: TDefaultRowDataObject;
};
