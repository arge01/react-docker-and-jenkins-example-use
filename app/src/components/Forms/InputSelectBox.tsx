import { OptionType } from '@/constants/OptionType';
import { splitFormProps, useField } from 'react-form';

const SelectField = (props: any) => {
  const [field, fieldOptions, { options, ...rest }] = splitFormProps(props);

  const {
    value = props?.defaultValue
      ? props?.hasObject
        ? JSON.stringify(props?.defaultValue)
        : props?.defaultValue
      : 0,
    setValue,
    meta: { error, isTouched },
  } = useField(field, fieldOptions);

  const handleSelectChange = (e: any) => {
    const data = e.target.value;
    if (props?.hasObject) {
      setValue(JSON.parse(data));
    } else {
      setValue(data);
    }
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
        value={props?.hasObject ? JSON.stringify(value) : value}
        onChange={handleSelectChange}
      >
        <option selected value={0}>
          Lütfen Seçin!
        </option>
        {options.map((option: OptionType) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>{' '}
      {isTouched && error ? <em>{error}</em> : null}
    </>
  );
};

type IProps = {
  label?: string;
  field: string;
  defaultValue?: any | undefined;
  validating?: any | undefined;
  required?: boolean;
  options: Array<OptionType> | undefined;
  hasObject?: boolean;
};

function InputSelect({
  label,
  field,
  defaultValue,
  required = true,
  validating,
  options = [],
  hasObject = false,
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

  return (
    <label>
      {label && <span>{label}</span>}
      {!defaultValue ? (
        <SelectField
          field={field}
          options={options}
          validate={validating || validate}
          hasObject={hasObject}
        />
      ) : (
        <SelectField
          defaultValue={defaultValue}
          field={field}
          options={options}
          validate={validating || validate}
          hasObject={hasObject}
        />
      )}
    </label>
  );
}

export default InputSelect;
