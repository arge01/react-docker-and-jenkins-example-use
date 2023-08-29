import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Crud from './crud';
import Basic from './basic';
import Filterable from './filterable';

import './table-scss.scss';

import {
  IActions,
  Iinital,
  IDataTabel,
  IForms,
  IForm,
  Criteria,
} from '@/services';
import { IState } from '@/redux/reducers';

import Provider, { Context } from './Provider';
import { IENTITY } from '@/services/movies/initial';

export type Model<MODEL, IENTITY> = {
  initial: Iinital<MODEL, IENTITY> | Iinital<any, any>;
  name: string;
};

type Pages = {
  page: number;
  size: number;
  change: boolean;
  sort?: string;
  direction?: 'ASC' | 'DESC';
};

type Props<MODEL, IFormSave, IFormUpdate, IFormDelete> = {
  keyField?: string | number;
  name?: string;
  model: Model<MODEL, IENTITY>;
  columns: Array<IDataTabel<any>>;
  formInputs: Array<IForm>;
  forms?: IForms<IFormSave, IFormUpdate, IFormDelete>;
  actions: IActions<IFormSave, IFormUpdate, IFormDelete>;
  onSearchBar?: boolean;
  pages?: Pages;
  criteria?: Criteria | Array<Criteria>;
  option?: any;
  children?: React.ReactNode;
};

export interface Selected<MODEL> {
  all: Array<MODEL>;
  select: MODEL;
}

function Table<MODEL, IFormSave, IFormUpdate, IFormDelete>(
  props: Props<MODEL, IFormSave, IFormUpdate, IFormDelete>,
) {
  const dispatch: Dispatch<any> = useDispatch();
  const state: IState | any = useSelector((state: IState) => state);
  const data: Iinital<MODEL, IENTITY> = state[props.model.name];

  const [selected, setSelected] = useState<Selected<MODEL>>();
  const [nextPage, setNextPage] = useState<any>();
  const [columns, setColumns] = useState(props.columns || []);

  const [page, setPage] = useState<Pages>({
    page: props.pages?.page || data?.pageable?.number || 0,
    size: props.pages?.size || data?.pageable?.size || 1000,
    change: props.pages?.change || data?.pageable?.change || false,
  });
  const [criteria, setCriteria] = useState(
    props.criteria || data?.criteria || undefined,
  );

  useEffect(() => {
    dispatch(props.actions.findAll(page, criteria));
  }, [dispatch]);

  useEffect(() => {
    if (page.change) {
      //dispatch(props.actions.findAll(page, criteria));
      dispatch(
        props.actions?.findAll(
          {
            page: page?.page || 0,
            size: page?.size || 1000,
            sort: page?.sort || 'id',
            direction: page?.direction || 'ASC',
          },
          criteria,
        ),
      );
      setPage({ ...page, change: false });
    }
  }, [page.change]);

  const value = {
    keyField: props.keyField,
    name: props?.name || data?.name || '',
    model: props.model,
    columns,
    setColumns,
    data,
    next: { nextPage, setNextPage },
    selected: { selected, setSelected },
    formInputs: props.formInputs,
    forms: props.forms || undefined,
    actions: props.actions,
    onSearchBar: props.onSearchBar,
    pages: { setPage, page },
    criteria: { criteria, setCriteria },
    option: props.option,
  };
  return <Provider value={value}>{props.children}</Provider>;
}

type page = {
  page: number | undefined;
  size: number | undefined;
  change: boolean | undefined;
  sort?: string | undefined;
  direction?: 'ASC' | 'DESC' | undefined;
};

type pages = {
  setPage: React.Dispatch<
    React.SetStateAction<{
      page: number;
      size: number;
      change: boolean;
      sort?: string;
      direction?: 'ASC' | 'DESC';
    }>
  >;
  page: page;
};

type typeNext = {
  nextPage: any | undefined;
  setNextPage: React.Dispatch<React.SetStateAction<any | undefined>>;
};

type typeSelected<MODEL> = {
  selected: Selected<MODEL> | undefined;
  setSelected: React.Dispatch<
    React.SetStateAction<Selected<MODEL> | undefined>
  >;
};

type ICriteria = {
  criteria: any | Array<any> | undefined;
  setCriteria: React.Dispatch<
    React.SetStateAction<any | Array<any> | undefined>
  >;
};

export interface IProvider<IMODEL, ICOLUMNS> {
  keyField?: string | number | undefined;
  name?: string;
  model?: Model<any, any> | undefined;
  columns: Array<ICOLUMNS>;
  setColumns?:
    | React.Dispatch<
        React.SetStateAction<IDataTabel<any>[]>
      >
    | undefined;
  data: Iinital<IMODEL, IENTITY> | undefined;
  next?: typeNext;
  selected?: typeSelected<IMODEL> | undefined;
  formInputs?: Array<IForm> | undefined;
  forms?: IForms<any, any, any> | undefined;
  actions?: IActions<any, any, any> | undefined;
  onSearchBar?: boolean | undefined;
  pages?: pages | undefined;
  criteria?: ICriteria | undefined;
  option?: object | undefined;
}

const ReduxDataTable = Object.assign(Table, {
  Crud,
  Context,
  Basic,
  Filterable,
});
export default ReduxDataTable;
