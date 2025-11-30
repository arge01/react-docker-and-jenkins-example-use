import { Payload } from '@/middleware/reactReducerAction';

import { Iinital } from '@/services';

import Model, { IENTITY, IMODEL } from '../initial';
import { types } from './ReduxType';

type Actions = Payload;

export default (
  state: Iinital<IMODEL, IENTITY> = new Model(),
  { type, payload, nextState }: Actions,
): Iinital<IMODEL, IENTITY> => {
  switch (type) {
    case types.PENDING:
      return {
        ...state,
        loading: true,

        updateSuccess: undefined,
        saveSuccess: undefined,
        deleteSuccess: undefined,
        error: undefined,
      };

    case types.FINDALL:
      let entities =
        payload?.content || payload?.data || payload?.Search || payload || [];
      if (!Array.isArray(entities)) {
        entities = [];
      }
      return {
        ...state,
        loading: false,
        isSuccess: true,
        entities,
        pageable: {
          empty: payload?.empty,
          first: payload?.first,
          last: payload?.last,
          number: payload?.number,
          numberOfElements:
            payload?.numberOfElements ||
            Number(nextState?.paginationRequestBean?.page),
          size:
            payload?.size ||
            Number(nextState?.paginationRequestBean?.size) ||
            5,
          totalElements:
            Number(payload?.totalElements) ||
            Number(payload?.totalResults) ||
            0,
          totalPages: Math.ceil(
            (Number(payload?.totalElements) ||
              Number(payload?.totalResults) ||
              0) /
              (payload?.size ||
                Number(nextState?.paginationRequestBean?.size) ||
                5),
          ),
        },
        criteria: nextState?.searchCriteriaList || undefined,
      };

    case types.FINDBYID:
      return {
        ...state,
        loading: false,
        findSuccess: true,
        updateSuccess: false,
        saveSuccess: false,
        deleteSuccess: false,
        entity: payload,
      };

    case types.FINDBYNAME:
      return {
        ...state,
        loading: false,
        findSuccess: true,
        updateSuccess: false,
        saveSuccess: false,
        deleteSuccess: false,
        entity: payload,
      };

    case types.SAVE:
      return {
        ...state,
        loading: false,
        saveSuccess: true,
        entity: payload,
      };

    case types.UPDATE:
      return {
        ...state,
        loading: false,
        updateSuccess: true,
        entity: payload,
      };

    case types.DELETE:
      return {
        ...state,
        loading: false,
        deleteSuccess: true,
        entity: payload,
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
