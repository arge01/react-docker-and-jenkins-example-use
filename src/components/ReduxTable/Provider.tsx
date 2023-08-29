/* eslint-disable @typescript-eslint/no-unused-vars */
import { IDataTabel } from '@/services';
import React, { createContext } from 'react';

import { IProvider } from '.';

const initial: IProvider<any, any> = {
  name: '',
  columns: [],
  data: undefined,
  setColumns: function (_value: React.SetStateAction<IDataTabel<any>[]>): void {
    throw new Error('Function not implemented.');
  },
};

type Props = {
  value: IProvider<any, any>;
  children: React.ReactNode;
};

export const Context = createContext<IProvider<any, any>>(initial);

function Provider({ value, children }: Props) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;
