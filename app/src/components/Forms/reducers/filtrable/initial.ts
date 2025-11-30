import { OptionType } from '@/constants/OptionType';

export interface Iinital {
  id: string;
  name: string;

  entities: any;
  entity: any;
  field: any;
  options: any;
  option: any;

  loading: boolean;
  isSuccess: boolean;
  findSuccess: boolean;
  saveSuccess: boolean | undefined;
  deleteSuccess: boolean | undefined;
  updateSuccess: boolean | undefined;
  error: string | undefined;
}

export interface IMODEL {
  field: string;
  data: Array<any>;
  options: Array<OptionType>;
}

class Model implements Iinital {
  id: string = 'input_filtrable';
  name: string = 'Input Filtrable';
  field: any = {};
  option!: any;
  options!: any;
  loading!: boolean;
  entity!: any;
  entities!: any;
  isSuccess!: boolean;
  findSuccess!: boolean;
  saveSuccess!: boolean;
  deleteSuccess!: boolean;
  updateSuccess!: boolean;
  error!: string | undefined;
}

export const model = new Model();
export default Model;
