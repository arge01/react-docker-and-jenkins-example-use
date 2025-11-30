/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, useEffect, useState } from 'react';

import { IActions, IForm, IForms } from '@/services';
import { MethodAction } from '@/constants/MethodAction';
import { useDispatch } from 'react-redux';
import Form from '../Forms';

type Actions<MODEL, IFormSave, IFormUpdate, IFormDelete> = {
  entity: MODEL | any | undefined;
  action: MethodAction;
  method: IActions<IFormSave, IFormUpdate, IFormDelete> | undefined;
};

type Props<MODEL, IFormSave, IFormUpdate, IFormDelete> = {
  success?: boolean;
  formInputs: Array<IForm> | undefined;
  forms?:
    | IForms<IFormSave, IFormUpdate, IFormDelete>
    | IForms<any, any, any>
    | undefined;
  actions: Actions<MODEL, IFormSave, IFormUpdate, IFormDelete>;
  extendButton?:
    | {
        name: string;
        style?: React.CSSProperties;
        onClick: any;
      }
    | undefined;
  defaultValue?: any | undefined;
  refresh?: () => void;
};

function ReduxForm<MODEL, IFormSave, IFormUpdate, IFormDelete>({
  success,
  formInputs,
  actions,
  extendButton,
  defaultValue = {},
  refresh = () => console.log('No Refresh'),
}: Props<MODEL, IFormSave, IFormUpdate, IFormDelete>): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();

  const [entity, setEntity]: MODEL | any | undefined = useState({});

  useEffect(() => {
    if (success) {
      setEntity(actions?.entity);
    }
  }, [success]);

  const onSubmit = async (values: object, _: object) => {
    const inputs = { ...actions.entity, ...values };
    switch (actions?.action) {
      case MethodAction.Delete:
        dispatch(actions?.method?.delete(inputs));
        break;

      case MethodAction.Save:
        await dispatch(actions?.method?.save(inputs));
        refresh();
        break;

      case MethodAction.Update:
        dispatch(actions?.method?.update(inputs));
        break;
    }
  };

  return (
    <Form extendButton={extendButton} onSubmit={onSubmit}>
      {formInputs?.map((v: IForm, k: number) => {
        return (
          <React.Fragment key={k + '-' + v?.name}>
            {!v.hidden && v.type === 'text' && (
              <Form.Text
                min={v?.min}
                max={v?.max}
                label={v.text}
                field={v.name}
                defaultValue={entity[v.name] || defaultValue?.[v.name]}
              />
            )}
            {!v.hidden && v.type === 'mail' && (
              <Form.Mail
                min={v?.min}
                max={v?.max}
                label={v.text}
                field={v.name}
                defaultValue={entity[v.name] || defaultValue?.[v.name]}
              />
            )}
            {!v.hidden && v.type === 'number' && (
              <Form.Number
                min={v?.min}
                max={v?.max}
                label={v.text}
                field={v.name}
                defaultValue={entity[v.name] || defaultValue?.[v.name]}
              />
            )}
            {!v.hidden && v.type === 'phone' && (
              <Form.Phone
                min={v?.min}
                max={v?.max}
                label={v.text}
                field={v.name}
                defaultValue={entity[v.name] || defaultValue?.[v.name]}
              />
            )}
            {!v.hidden && v.type === 'date' && (
              <Form.Date
                label={v.text}
                field={v.name}
                defaultValue={entity[v.name] || defaultValue?.[v.name]}
              />
            )}
            {!v.hidden && v.type === 'file' && (
              <Form.File
                label={v.text}
                field={v.name}
                defaultValue={undefined}
              />
            )}
            {!v.hidden && v.type === 'password' && (
              <Form.Password
                min={v?.min}
                max={v?.max}
                label={v.text}
                field={v.name}
                defaultValue={entity[v.name] || defaultValue?.[v.name]}
              />
            )}
            {!v.hidden && v.type === 'checkbox' && (
              <Form.CheckBox
                label={v.text}
                field={v.name}
                defaultValue={entity[v.name] || defaultValue?.[v.name]}
              />
            )}
            {!v.hidden && v.type === 'selectbox' && (
              <Form.Select
                options={v?.options}
                label={v.text}
                field={v.name}
                defaultValue={entity[v.name] || defaultValue?.[v.name]}
              />
            )}
            {!v.hidden && v.type === 'filterable' && (
              <Form.Filtrable
                filterable={{
                  name: v?.filterable?.name || undefined,
                  data: v?.filterable?.data || undefined,
                  actions: v?.filterable?.actions || undefined,
                  filterColumn: v?.filterable?.filterColumn || undefined,
                }}
                label={v.text}
                field={v.name}
                defaultValue={entity[v.name] || defaultValue?.[v.name]}
              />
            )}
            {!v.hidden && v.type === 'textarea' && (
              <Form.TextArea
                min={v?.min}
                max={v?.max}
                label={v.text}
                field={v.name}
                defaultValue={entity[v.name] || defaultValue?.[v.name]}
              />
            )}
          </React.Fragment>
        );
      })}
    </Form>
  );
}

export default ReduxForm;
