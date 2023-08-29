import reactReducerAction from '@/middleware/reactReducerAction';

import { IActions } from '..';
import { IFormDelete, IFormSave, IFormUpdate } from './initial/IForm';
import { types } from './reducer/ReduxType';
import { services } from './services';

export const actions: IActions<IFormSave, IFormUpdate, IFormDelete> = {
  findAll: (paginationRequestBean, searchCriteriaList): Promise<any> =>
    reactReducerAction(
      {
        loading: types.PENDING,
        success: types.FINDALL,
        error: types.ERROR,
      },
      () => services.findAll(paginationRequestBean, searchCriteriaList),
      { paginationRequestBean, searchCriteriaList } || undefined,
    ),

  findById: (id: number): Promise<any> =>
    reactReducerAction(
      {
        loading: types.PENDING,
        success: types.FINDBYID,
        error: types.ERROR,
      },
      () => services.findById(id),
    ),

  findByName: (name: string): Promise<any> =>
    reactReducerAction(
      {
        loading: types.PENDING,
        success: types.FINDBYNAME,
        error: types.ERROR,
      },
      () => services.findByName(name),
    ),

  save: (form: IFormSave): Promise<any> =>
    reactReducerAction(
      {
        loading: types.PENDING,
        success: types.SAVE,
        error: types.ERROR,
      },
      () => services.save(form),
    ),

  update: (form: IFormUpdate): Promise<any> =>
    reactReducerAction(
      { loading: types.PENDING, success: types.UPDATE, error: types.ERROR },
      () => services.update(form),
    ),

  delete: (form: IFormDelete): Promise<string> =>
    reactReducerAction(
      {
        loading: types.PENDING,
        success: types.DELETE,
        error: types.ERROR,
      },
      () => services.delete(form),
    ),
};
