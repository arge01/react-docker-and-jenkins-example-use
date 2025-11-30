import { toast } from 'react-toastify';
import toastMessage from './toast/toastMessage';
import { IPaginationRequestBean, ISearchCriteria } from '@/services';

type type = {
  loading: string;
  success: string;
  error: string;
};

type message = {
  success: any;
  error: any;
};

export type Payload = {
  payload: any;
  status: any;
  nextState?:
    | any
    | {
        paginationRequestBean: IPaginationRequestBean | undefined;
        searchCriteriaList:
          | ISearchCriteria
          | Array<ISearchCriteria>
          | undefined;
      };
  nextData?: any;
  info?: any;
  type: string;
  err: boolean;
};

const reactReducerAction =
  (type: type, actions: any, nextState?: any, nextData?: any): any =>
  async (dispatch: any) => {
    const message: message = {
      success: toastMessage(type.success),
      error: toastMessage(type.error),
    };

    dispatch({
      type: type.loading,
    });

    try {
      const payload = await actions();

      const result = dispatch({
        status: payload,
        type: type.success,
        payload: payload?.data,
        info: payload?.data?.message,
        nextState,
        nextData,
        err: false,
      });

      if (result.type === type.success) {
        if (result.payload) {
          toast.success(message.success, {
            position: 'bottom-right',
            autoClose: 3000,
          });
        } else if (result.info) {
          toast.info(result.info, {
            position: 'bottom-right',
            autoClose: 3000,
          });
        }
      }

      return result;
    } catch (err: any) {
      const result = dispatch({
        status: err,
        type: type.error,
        payload: err?.message,
        err: true,
      });

      if (typeof result?.payload === 'string') {
        toast.error(result?.payload, {
          position: 'bottom-right',
          autoClose: 3000,
        });
      }

      return result;
    }
  };

export default reactReducerAction;
