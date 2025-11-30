import React from 'react';
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
          type="text"
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
  validating?: any | undefined;
  required?: boolean;
  min?: number;
  max?: number;
};

function TextForm({
  label = '',
  field,
  defaultValue = '',
  required = true,
  validating,
  min,
  max,
}: IProps) {
  const validate = (value: any) => {
    if (!required) {
      const ln = value?.length + 1;
      if (min) {
        if (ln <= min) {
          return 'Please at least ' + min + ' enter!';
        }
      }
      if (max) {
        if (ln >= max) {
          return 'Please at least ' + max + ' enter!';
        }
      }
      return false;
    } else {
      if (!value) {
        return label + ' zorunludur!';
      } else if (value?.length) {
        const ln = value?.length + 1;
        if (min) {
          if (ln <= min) {
            return 'Please at least ' + min + ' enter!';
          }
        }
        if (max) {
          if (ln >= max) {
            return 'Please at least ' + max + ' enter!';
          }
        }
      }
    }
    return false;
  };

  return (
    <label>
      {label && <span>{label}</span>}
      {!defaultValue ? (
        <InputField
          field={field}
          validate={validating || validate}
          data-required={required}
        />
      ) : (
        <InputField
          defaultValue={defaultValue}
          field={field}
          validate={validating || validate}
          data-required={required}
        />
      )}
    </label>
  );
}

export default TextForm;
