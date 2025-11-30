import { Payload } from '@/middleware/reactReducerAction';

import Model, { Iinital } from '@components/Forms/reducers/filtrable/initial';

import { types } from '@components/Forms/reducers/filtrable/type';

type Actions = Payload;

export default (
  state: Iinital = new Model(),
  { type, payload }: Actions,
): Iinital => {
  switch (type) {
    case types.PENDING:
      return {
        ...state,
        loading: true,

        isSuccess: false,
        updateSuccess: undefined,
        saveSuccess: undefined,
        deleteSuccess: undefined,
        error: undefined,
      };

    case types.FINDALL:
      const entities = payload?.data || [];
      const options = payload?.options || [];
      return {
        ...state,
        loading: false,
        isSuccess: true,
        field: {
          ...state?.field,
          [payload?.field]: payload?.field,
        },
        entities: {
          ...state.entities,
          [payload?.field]: entities,
        },
        options: {
          ...state.options,
          [payload?.field]: options,
        },
        option: entities?.[payload?.field] || {},
      };

    case types.ERROR:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        findSuccess: false,
        updateSuccess: false,
        saveSuccess: false,
        deleteSuccess: false,
        error: payload,
      };

    default:
      return state;
  }
};
