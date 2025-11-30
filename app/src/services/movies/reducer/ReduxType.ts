import { ITypes } from '@/services';

class Types implements ITypes {
  private name: string = '_MOVIES';

  PENDING: string = `PENDING${this.name}`;
  FINDALL: string = `FINDALL${this.name}`;
  FINDBYID: string = `FINDBYID${this.name}`;
  FINDBYNAME: string = `FINDBYNAME${this.name}`;
  SAVE: string = `SAVE${this.name}`;
  UPDATE: string = `UPDATE${this.name}`;
  DELETE: string = `DELETE${this.name}`;
  ERROR: string = `ERROR${this.name}`;
}

export const types = new Types();
export default Types;
