import { useField, splitFormProps } from 'react-form';

const InputField = (props: any, ref: any) => {
  const [field, fieldOptions, rest] = splitFormProps(props);

  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField(field, fieldOptions);

  return (
    <>
      <input name={field} type="hidden" {...getInputProps({ ref, ...rest })} />
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
};

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
  required = false,
  validating,
  min,
  max,
}: IProps) {
  const validate = (value: any) => {
    if (!required) {
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
    <>
      {!defaultValue ? (
        <InputField field={field} validate={validating || validate} />
      ) : (
        <InputField
          defaultValue={defaultValue}
          field={field}
          validate={validating || validate}
        />
      )}
    </>
  );
}

export default TextForm;
