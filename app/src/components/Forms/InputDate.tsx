import React from 'react';
import { TimesDateToInput } from '@/utils/TimesDateToInput';

import { useField, splitFormProps, FieldProps } from 'react-form';

const InputField = React.forwardRef<HTMLInputElement, FieldProps>(
  (props: any, ref: any) => {
    const [field, fieldOptions, rest] = splitFormProps(props);

    const {
      meta: { error, isTouched, isValidating },
      getInputProps,
    } = useField(field, fieldOptions);

    return (
      <>
        <input
          data-id={`${
            props?.['data-required']
              ? isTouched
                ? error
                  ? 'error'
                  : 'success'
                : props.defaultValue
                ? 'success'
                : 'error'
              : 'success'
          }`}
          name={field}
          type="date"
          {...getInputProps({ ref, ...rest })}
        />
        {isValidating ? (
          <em>Validating...</em>
        ) : isTouched && error ? (
          <em>{error}</em>
        ) : null}
      </>
    );
  },
);

type IProps = {
  label?: string;
  field: string;
  defaultValue?: any | undefined;
  required?: boolean;
  validating?: any | undefined;
};

function DateForm({
  label,
  field,
  defaultValue = '',
  required = true,
  validating,
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
      <span>{label}</span>{' '}
      {!defaultValue ? (
        <InputField
          field={field}
          validate={validating || validate}
          data-required={required}
        />
      ) : (
        <InputField
          defaultValue={
            typeof defaultValue === 'number'
              ? TimesDateToInput(defaultValue)
              : defaultValue
          }
          field={field}
          validate={validating || validate}
          data-required={required}
        />
      )}
    </label>
  );
}

export default DateForm;
