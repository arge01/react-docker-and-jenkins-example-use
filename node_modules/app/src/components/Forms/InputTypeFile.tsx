/* eslint-disable @typescript-eslint/no-unused-vars */
import { useField, splitFormProps } from 'react-form';

const InputField = (props: any) => {
  const [field, fieldOptions] = splitFormProps(props);

  const {
    meta: { error, isTouched, isValidating },
    setValue,
  } = useField(field, fieldOptions);

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL: any = '';
      // Make new FileReader
      const reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
      return fileInfo;
    });
  };

  const onChange = (event: any) => {
    const file = event.target.files?.[0];
    getBase64(file).then((result: any) => {
      setValue(result);
    });
  };

  return (
    <>
      <input
        data-id={`${isTouched ? (error ? 'error' : 'success') : 'error'}`}
        name={field}
        type="file"
        onChange={onChange}
        accept={props.accept}
      />
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
};

type IProps = {
  label: string;
  field: string;
  defaultValue?: any | undefined;
  required?: boolean;
  validating?: any | undefined;
  accept?: any | undefined;
};

function FileForm({
  label,
  field,
  defaultValue = '',
  validating,
  accept,
}: IProps) {
  const validate = (_: any) => {
    return false;
  };

  return (
    <label>
      <span>{label}</span>{' '}
      {!defaultValue ? (
        <InputField
          field={field}
          validate={validating || validate}
          accept={accept}
        />
      ) : (
        <InputField
          defaultValue={defaultValue}
          field={field}
          validate={validating || validate}
          accept={accept}
        />
      )}
    </label>
  );
}

export default FileForm;
