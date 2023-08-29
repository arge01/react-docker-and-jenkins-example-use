import { ReactElement } from 'react';

import { IForm } from '@/services';
import { OptionType } from '@/constants/OptionType';

import Form from '@components/Forms';

interface IRData {
  id: number;
  title: string;
  name: string;
  form: Array<OptionType>;
}

type IProps = {
  label: string;
  field: string;
  returningData: Array<IRData>;
  fieldText?: any;
  children?: ReactElement | Array<ReactElement>;
  defaultData?: Array<any> | undefined;
  returnData?: boolean;
  required?: boolean;
  validating?: any | undefined;
  min?: number;
  max?: number;
  action?: IForm['actions'];
};

function MultiData(props: IProps) {
  return (
    <>
      <ul>
        {props.returningData?.map((v: IRData, key: number) => {
          return (
            <li key={key + '-' + v?.id}>
              <span>{v?.title}</span>
              {v.form.map((m) => {
                return (
                  <>
                    {m?.hidden ? (
                      <Form.Hidden
                        field={props.field + '.' + v?.name + '.' + m?.key}
                        defaultValue={m.value}
                      />
                    ) : (
                      <>
                        {m?.type === 'select' ? (
                          <Form.Select
                            field={props.field + '.' + v?.name + '.' + m?.key}
                            defaultValue={m.value}
                            options={[{ key: m?.key, value: m?.value }]}
                            hasObject
                          />
                        ) : (
                          <Form.Text
                            field={props.field + '.' + v?.name + '.' + m?.key}
                            defaultValue={m.value}
                          />
                        )}
                      </>
                    )}
                  </>
                );
              })}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default MultiData;
