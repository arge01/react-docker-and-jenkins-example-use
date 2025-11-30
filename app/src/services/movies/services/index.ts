import { IServices, IPaginationRequestBean, ISearchCriteria } from '@/services';
import { IFormDelete, IFormSave, IFormUpdate } from '../initial/IForm';

import { AxiosPromise } from 'axios';

import fetchConfig from '@/middleware/fetchConfig';
import { Methods } from '@/constants/Methods';
import config from '@/constants/config';

const uri = `https://www.omdbapi.com/?apikey=${config.apikey}`;

export const services: IServices<IFormSave, IFormUpdate, IFormDelete> = {
  findAll: (
    paginationRequestBean: IPaginationRequestBean | undefined,
    searchCriteriaList: ISearchCriteria | Array<ISearchCriteria> | undefined,
  ): AxiosPromise<any> => {
    if (paginationRequestBean) {
      if (!Array.isArray(searchCriteriaList)) {
        return fetchConfig(
          Methods.GET,
          `${uri}&page=${paginationRequestBean?.page}${
            searchCriteriaList?.s ? '&s=' + searchCriteriaList?.s : ''
          }${searchCriteriaList?.y ? '&y=' + searchCriteriaList?.y : ''}`,
        );
      } else {
        return fetchConfig(
          Methods.GET,
          `${uri}&page=${paginationRequestBean?.page}`,
        );
      }
    } else {
      return fetchConfig(Methods.POST, `${uri}`);
    }
  },
  findById: (id: number): AxiosPromise<any> =>
    fetchConfig(Methods.GET, `${uri}/find-by-id`, { id }),
  findByName: (name: string): AxiosPromise<any> =>
    fetchConfig(Methods.POST, `${uri}&i=${name}`),
  save: (form: IFormSave): AxiosPromise<any> =>
    fetchConfig(Methods.POST, `${uri}/save`, form),
  update: (form: IFormUpdate): AxiosPromise<any> =>
    fetchConfig(Methods.POST, `${uri}/update`, form),
  delete: (form: IFormDelete): AxiosPromise<any> =>
    fetchConfig(Methods.POST, `${uri}/delete`, form),
};
