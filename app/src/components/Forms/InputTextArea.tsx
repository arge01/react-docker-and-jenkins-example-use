import { splitFormProps, useField } from 'react-form';

const TextArea = (props: any) => {
  const [field, fieldOptions, { ...rest }] = splitFormProps(props);

  const {
    value = '',
    setValue,
    meta: { error, isTouched },
  } = useField(field, fieldOptions);

  const handleSelectChange = (e: any) => {
    if (typeof value === 'string') {
      if (props?.max - value?.length <= 0) {
        return setValue('');
      }
    }
    setValue(e.target.value);
  };

  return (
    <>
      {props?.max && (
        <em className="info">
          Kalan karekter:{' '}
          {typeof value === 'string' && props?.max - value?.length}
        </em>
      )}
      <textarea
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
        value={value}
        onChange={handleSelectChange}
      />{' '}
      {isTouched && error ? <em>{error}</em> : null}
    </>
  );
};

type IProps = {
  label: string;
  field: string;
  defaultValue?: any | undefined;
  required?: boolean;
  validating?: any | undefined;
  min?: number;
  max?: number;
};

function InputTextArea({
  label,
  field,
  defaultValue,
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
      <span>{label}</span>{' '}
      {!defaultValue ? (
        <TextArea
          min={min}
          max={max}
          field={field}
          validate={validating || validate}
        />
      ) : (
        <TextArea
          min={min}
          max={max}
          defaultValue={defaultValue}
          field={field}
          validate={validating || validate}
        />
      )}
    </label>
  );
}

export default InputTextArea;
