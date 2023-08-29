import { IForm } from "@/services";

export interface IFormSave {
  name: string;
  telephone: string;
}

export interface IFormUpdate {}

export interface IFormDelete {}

export const formInputs: Array<IForm> = [];
