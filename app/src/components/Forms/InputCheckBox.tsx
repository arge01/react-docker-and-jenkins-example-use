import { splitFormProps, useField } from 'react-form';

const CheckBox = (props: any) => {
  const [field, fieldOptions, { ...rest }] = splitFormProps(props);

  const { value = '', setValue } = useField(field, fieldOptions);

  const handleSelectChange = () => {
    setValue(!value);
  };

  return (
    <>
      <input
        className="toggle__input"
        type="checkbox"
        {...rest}
        value={value}
        checked={value}
        onChange={handleSelectChange}
      />
    </>
  );
};

type IProps = {
  label: string;
  field: string;
  defaultValue?: any | undefined;
  required?: boolean;
  validating?: any | undefined;
};

function InputCheckBox({ label, field, defaultValue }: IProps) {
  return (
    <div className="lbl">
      <span>{label}</span>{' '}
      <label className="toggle">
        {!defaultValue ? (
          <CheckBox field={field} />
        ) : (
          <CheckBox defaultValue={defaultValue} field={field} />
        )}
        <span className="toggle-track">
          <span className="toggle-indicator">
            <span className="checkMark">
              <svg
                viewBox="0 0 24 24"
                id="ghq-svg-check"
                role="presentation"
                aria-hidden="true"
              >
                <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
              </svg>
            </span>
          </span>
        </span>
      </label>
    </div>
  );
}

export default InputCheckBox;
