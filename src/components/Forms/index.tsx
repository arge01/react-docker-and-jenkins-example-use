import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { FormInstance, OptionalPromise, useForm } from 'react-form';

import Text from '@components/Forms/InputText';
import Hidden from '@components/Forms/InputHidden';
import Mail from '@components/Forms/InputMail';
import Number from '@components/Forms/InputNumber';
import Phone from '@components/Forms/InputPhone';
import Date from '@components/Forms/InputDate';
import File from '@components/Forms/InputTypeFile';
import Password from '@components/Forms/InputPassword';
import Select from '@components/Forms/InputSelectBox';
import TextArea from '@components/Forms/InputTextArea';
import CheckBox from '@components/Forms/InputCheckBox';
import Filtrable from '@components/Forms/InputFiltrable';
import MultiBox from '@components/Forms/MultiBox';
import MultiData from '@components/Forms/MultiData';

import './styles.scss';

type IProps = {
  className?: string;
  children?: React.ReactNode;
  onSubmit: (
    values: any,
    instance: FormInstance<any, any>,
  ) => OptionalPromise<void>;
  submitButton?: boolean;
  validationFocus?: boolean;
  submitValidation?: boolean;

  btn?: {
    name: string;
    style?: React.CSSProperties;
  };
  style?: React.CSSProperties;
  extendButton?:
    | {
        name: string;
        style?: React.CSSProperties;
        onClick: any;
      }
    | undefined;

  onChange?:
    | {
        value: any;
        setValue: Dispatch<SetStateAction<any>>;
      }
    | undefined;
};

function Forms({
  className,
  children,
  extendButton,
  onSubmit,
  btn,
  style,
  onChange,
  validationFocus = true,
  submitValidation = true,
}: IProps) {
  const {
    Form,
    values,
    meta: { isSubmitting, canSubmit },
  } = useForm<any>({
    onSubmit,
  });

  const onClick = () => {
    if (submitValidation) {
      const el: any =
        document
          .getElementById('form-validation')
          ?.querySelectorAll(`[data-id="error"]`) || [];

      el?.[0]?.focus();
    }
  };

  useEffect(() => {
    onChange?.setValue(values);
  }, [values]);

  return (
    <section style={style} className={`react-form`}>
      <Form
        className={`${className}`}
        id={`${validationFocus ? 'form-validation' : 'form'}`}
      >
        {children}{' '}
        <label className="flex-auto">
          {extendButton && (
            <>
              <span></span>
              <button
                style={extendButton?.style}
                className="button back-button"
                onClick={extendButton.onClick}
              >
                {extendButton.name}
              </button>
            </>
          )}
          <span></span>
          <button
            onClick={onClick}
            name="submit"
            className={`button ${!canSubmit ? 'disabled' : 'no-disabled'}`}
            style={btn?.style}
            type="submit"
            disabled={false}
          >
            {btn?.name || 'Submit'}
          </button>
        </label>
        <>
          <em>{isSubmitting ? 'Submiting...' : null}</em>
        </>
      </Form>
    </section>
  );
}

const Form = Object.assign(Forms, {
  Mail,
  Text,
  Hidden,
  File,
  Number,
  Date,
  Password,
  Phone,
  Select,
  TextArea,
  CheckBox,
  Filtrable,
  MultiBox,
  MultiData,
});

export default Form;
