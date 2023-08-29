import { AxiosPromise } from "axios";

import { OptionType } from "@/constants/OptionType";

import { ReducerModel } from "@/redux/reducers";

export interface Pageable {
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
  sort?: string;
  direction?: "ASC" | "DESC";
  change?: boolean;
}

export interface Criteria {
  [key: string]: string | number
}

export interface Iinital<MODEL, IENTITY> {
  id: string;
  name: string;
  loading: boolean;
  entity: IENTITY;
  entities: Array<MODEL>;
  pageable?: Pageable | undefined;
  criteria?: Criteria | Array<Criteria> | undefined;
  isSuccess: boolean;
  findSuccess: boolean;
  saveSuccess: boolean | undefined;
  deleteSuccess: boolean | undefined;
  updateSuccess: boolean | undefined;
  info?: any | undefined;
  error: string | undefined;
  role?:
    | {
        save?: string | undefined;
        update?: string | undefined;
        delete?: string | undefined;
        view?: string | undefined;
      }
    | undefined;
}

export interface IDataTabel<MODEL> {
  dataField: string;
  relation?: {
    name: ReducerModel<MODEL>["name"] | string;
    objects: Array<OptionType>;
  };
  text: string;
  sort: boolean;
  hidden: boolean;
  formatter?: any;
  headerSortingStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  classes?: string;
  searchText?: Array<string> | string;
  link?: boolean;
}

export interface ITypes {
  PENDING: string;
  FINDALL: string;
  FINDBYID: string;
  FINDBYNAME: string;
  SAVE: string;
  UPDATE: string;
  DELETE: string;
  ERROR: string;
}

export interface IForm {
  type:
    | "text"
    | "mail"
    | "number"
    | "password"
    | "phone"
    | "file"
    | "date"
    | "checkbox"
    | "selectbox"
    | "combobox"
    | "relation"
    | "filterable"
    | "textarea";
  disabled?: boolean;
  required: boolean;
  name: string;
  forHtml: string;
  text: string;
  icon: string | undefined;
  defaultValue?: any;
  combo?: {
    type: "single" | "multi";
    name:
      | "contactTypes"
      | "documentTypes"
      | "environmentTypes"
      | "relationTypes"
      | "specificationTypes"
      | "projectSpecificationTypes"
      | "projectStatuses"
      | "projectServiceTypes"
      | "operationTypes"
      | boolean;
    data: "all" | string | Array<any>;
  };
  filterable?: {
    name: ReducerModel<any>["name"] | undefined;
    data: "all" | string | undefined;
    actions: IActions<any, any, any> | undefined;
    filter?: boolean;
    filterColumn?: {
      key: string;
      value?: string | undefined;
      values?: Array<string> | undefined;
      trim?: string | undefined;
    };
  };
  relation?: {
    type: "single" | "multi";
    name: string;
    data: "all" | string;
  };
  options?: Array<OptionType>;
  min?: number;
  max?: number;
  validating?: () => any;
  hidden?: boolean;
  actions?: IActions<any, any, any> | undefined;
}

export interface IForms<IFormSave, IFormUpdate, IFormDelete> {
  save: IFormSave;
  update: IFormUpdate;
  delete: IFormDelete;
}

export type IPaginationRequestBean = {
  page: number;
  size: number;
  sort?: string;
  direction?: "ASC" | "DESC";
};

export type ISearchCriteria = Criteria;

export interface IServices<SAVE, UPDATE, DELETE> {
  findAll: (
    paginationRequestBean?: IPaginationRequestBean,
    searchCriteriaList?: ISearchCriteria | Array<ISearchCriteria>
  ) => AxiosPromise<any>;
  findById: (id: number) => AxiosPromise<any>;
  findByName: (name: string) => AxiosPromise<any>;
  save: (form: SAVE) => AxiosPromise<any>;
  update: (form: UPDATE) => AxiosPromise<any>;
  delete: (form: DELETE) => AxiosPromise<any>;
}

export interface IActions<SAVE, UPDATE, DELETE> {
  findAll: (
    paginationRequestBean?: IPaginationRequestBean,
    searchCriteriaList?: ISearchCriteria | Array<ISearchCriteria>
  ) => Promise<any>;
  findById: (id: number) => Promise<any>;
  findByName: (name: string) => Promise<any>;
  save: (form: SAVE) => Promise<any>;
  update: (form: UPDATE) => Promise<any>;
  delete: (form: DELETE) => Promise<any>;
}
