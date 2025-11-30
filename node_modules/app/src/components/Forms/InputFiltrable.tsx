import { OptionType } from '@/constants/OptionType';
import { IState } from '@/redux/reducers';
import { IForm, ISearchCriteria, Iinital } from '@/services';
import FormatterSelectBox from '@/utils/FormatterSelectBox';
import { useEffect } from 'react';
import { splitFormProps, useField } from 'react-form';
import { useDispatch, useSelector } from 'react-redux';
import actionsFiltrableInput from './reducers/filtrable/actions';

import { Iinital as IMODEL } from '@components/Forms/reducers/filtrable/initial';

const SelectField = (props: any) => {
  const [field, fieldOptions, { options, ...rest }] = splitFormProps(props);

  const {
    value = props.data?.find((f: any) => f.id == props?.defaultValue),
    setValue,
    meta: { error, isTouched },
  } = useField(field, fieldOptions);

  const handleSelectChange = (e: any) => {
    const data = props.data?.find((f: any) => f.id == e.target.value);
    setValue(data);
  };

  return (
    <>
      <select
        data-id={`${
          isTouched
            ? error
              ? 'error'
              : 'success'
            : props.defaultValue
            ? 'success'
            : 'error'
        }`}
        {...rest}
        value={value?.id}
        onChange={handleSelectChange}
        data={field + '-' + value?.id}
      >
        <option selected value={0}>
          Lütfen Seçin!
        </option>
        <>
          {props?.loading && (
            <>
              {options?.map((option: OptionType, key: number) => (
                <option key={option.key + '-' + key} value={option.key}>
                  {option.value}
                </option>
              ))}
            </>
          )}
        </>
      </select>{' '}
      {isTouched && error ? <em>{error}</em> : null}
    </>
  );
};

type IProps = {
  label: string;
  field: string;
  defaultValue?: any | undefined;
  validating?: any | undefined;
  required?: boolean;
  options?: Array<OptionType> | undefined;
  filterable: IForm['filterable'];
  filterColumn?: {
    key: string;
    value?: string | undefined;
    values?: Array<string> | undefined;
    trim?: string | undefined;
    criteria?: Array<ISearchCriteria>;
  };
};

function InputFiltrable({
  label,
  field,
  defaultValue,
  required = true,
  validating,
  filterable,
  filterColumn = { key: 'id', value: 'name', values: undefined, criteria: [] },
}: IProps) {
  const validate = (value: any) => {
    if (!required) {
      return false;
    } else {
      if (!value) {
        return label + ' zorunludur!';
      }
    }
    return false;
  };

  const dispatch: any = useDispatch();

  const state: any = useSelector((state: IState) => state);
  const data: Iinital<any, any> =
    typeof filterable?.name === 'string' ? state?.[filterable.name] : undefined;
  const fieldOptions: IMODEL =
    typeof filterable?.name === 'string' ? state?.input_filtrable : undefined;

  useEffect(() => {
    filterable?.actions &&
      dispatch(
        filterable?.actions.findAll(
          { page: 0, size: 1000 },
          data?.criteria || filterColumn.criteria,
        ),
      ).then((payload: any) => {
        const data = payload?.payload;
        const entities: Array<any> = data?.content || data?.data || data || [];

        const entitiesFilter = entities?.map((f: any) => {
          return {
            [filterable?.data !== 'all' ? filterable.data || 'id' : 'id']:
              f?.[filterable?.data !== 'all' ? filterable.data || 'id' : 'id'],
          };
        });
        return dispatch(
          actionsFiltrableInput.findAll({
            field,
            data: filterable.data
              ? filterable?.data !== 'all'
                ? entitiesFilter
                : entities
              : entities,
            options: FormatterSelectBox(
              filterable?.data
                ? filterable?.data !== 'all'
                  ? entitiesFilter
                  : entities
                : entities,
              filterable?.filterColumn?.key || filterColumn.key || 'id',
              filterable?.filterColumn?.value || filterColumn.value || 'name',
              filterable?.filterColumn?.values || filterColumn.values,
              filterable?.filterColumn?.trim || filterColumn.trim,
            ),
          }),
        );
      });
  }, [field]);

  return (
    <>
      {typeof filterable?.name === 'string' && (
        <label>
          <span>{label}</span>{' '}
          {!defaultValue ? (
            <SelectField
              field={field}
              options={
                fieldOptions?.isSuccess ? fieldOptions?.options?.[field] : []
              }
              validate={validating || validate}
              data={fieldOptions?.entities?.[field] || []}
              loading={fieldOptions?.isSuccess}
            />
          ) : (
            <SelectField
              defaultValue={defaultValue}
              field={field}
              options={
                fieldOptions?.isSuccess ? fieldOptions?.options?.[field] : []
              }
              validate={validating || validate}
              data={fieldOptions?.entities?.[field] || []}
              loading={fieldOptions?.isSuccess}
            />
          )}
        </label>
      )}
    </>
  );
}

export default InputFiltrable;
