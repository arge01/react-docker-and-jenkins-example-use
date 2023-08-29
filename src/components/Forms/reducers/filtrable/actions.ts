import { IMODEL } from "@components/Forms/reducers/filtrable/initial";
import { types } from "@components/Forms/reducers/filtrable/type";

const findAll = (payload: IMODEL) => async (dispatch: any) => {
  dispatch({
    type: types.PENDING,
  });
  return dispatch({
    type: types.FINDALL,
    payload,
  });
};

const actionsFiltrableInput = { findAll };
export default actionsFiltrableInput;
