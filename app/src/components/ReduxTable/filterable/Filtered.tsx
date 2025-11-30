import { useContext, useState } from 'react';

import Form from '@/components/Forms';

import { OptionType } from '@/constants/OptionType';
import { Criteria, IDataTabel } from '@/services';

import ReduxDataTable, { IProvider } from '..';

import { columnText, criteriaText } from '@/constants/CriteriaText';
import { QueryOperator } from '@/constants/QueryOperator';

function Filtered() {
  const { criteria, pages, columns }: IProvider<any, any> = useContext(
    ReduxDataTable.Context,
  );

  const operator: Array<OptionType> = [
    {
      key: 1,
      value: criteriaText(1),
    },
    {
      key: 2,
      value: criteriaText(2),
    },
    {
      key: 3,
      value: criteriaText(3),
    },
    {
      key: 4,
      value: criteriaText(4),
    },
    {
      key: 5,
      value: criteriaText(5),
    },
    {
      key: 6,
      value: criteriaText(6),
    },
  ];

  const getJsonParse = (value: string | undefined) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  };

  const key: Array<OptionType> = columns
    .filter((f) => f.dataField !== '#')
    ?.map((v: IDataTabel<any>) => {
      if (!v?.relation) {
        return {
          key: v.dataField,
          value: v.text,
        };
      } else {
        return {
          key: JSON.stringify({
            relation: v?.relation?.name,
            name: v.text,
            entity: v.relation,
          }),
          value: v.text,
        };
      }
    });

  interface Values {
    key: string;
    operator:
      | QueryOperator.equals
      | QueryOperator.greaterthan
      | QueryOperator.in
      | QueryOperator.lessthan
      | QueryOperator.like
      | QueryOperator.noteq;
    value?: string | number;
    values?: Array<string>;
    relation?: string;
  }
  const [cr, setCr] = useState<any | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const onSubmit = (values: Values) => {
    const data = {
      key: values.key,
      operator: values.operator,
      value: values.value,
    };

    if (values.relation) {
      if (getJsonParse(values.key)) {
        data.key = getJsonParse(values.key)?.relation + '.' + values.relation;
      }
    }
    if (cr) {
      const nc: Array<any> =
        criteria?.criteria?.map((f: any) => {
          if (f === cr) {
            return data;
          }
          return f;
        }) || [];

      criteria?.setCriteria(nc);

      pages?.setPage({
        ...pages.page,
        page: 0,
        size: 1000,
        change: true,
      });
    } else {
      criteria?.setCriteria([...(criteria.criteria || []), data]);

      pages?.setPage({
        ...pages.page,
        page: 0,
        size: 1000,
        change: true,
      });
    }

    setOpen(false);
  };

  const remove = (cr: Criteria) => {
    criteria?.setCriteria(criteria?.criteria?.filter((f: any) => f !== cr));
    pages?.setPage({
      ...pages.page,
      page: 0,
      size: 1000,
      change: true,
    });
  };

  const add = () => {
    setCr(undefined);
    setOpen(!open);
  };

  const change = (v: Criteria) => {
    if (open) {
      setCr(undefined);
      setOpen(false);
    } else {
      setCr(v);
      setOpen(true);
    }
  };

  const extendButton = {
    name: 'Kapat',
    onClick: () => {
      setOpen(false);
    },
  };

  const defaultValueKey = (value: string | undefined, data: any) => {
    const split = value?.split('.') || [];
    if (split?.[0] && split?.[1]) {
      return (
        data.find((f: OptionType) => getJsonParse(f.key)?.relation === split[0])
          ?.key || ''
      );
    } else {
      return split?.[0] || '';
    }
  };

  const defaultValueParseKey = (value: string | undefined) => {
    const split = value?.split('.') || [];
    return split?.[1] || '';
  };

  const [value, setValue] = useState({
    value: undefined,
    key: undefined,
    operator: undefined,
  });

  return (
    <section className="filter-contents">
      <b>Filters: </b>
      <ul>
        {criteria?.criteria?.map((v: any, k: number) => {
          return (
            <>
              {typeof v?.value === 'string' ? (
                <li key={k}>
                  <div onClick={() => change(v)} className="content">
                    <section>
                      <span>Coulmn: </span>{' '}
                      <i>{columnText(v?.key, columns)?.text}</i>
                    </section>
                    <section>
                      <span>Criteria: </span>{' '}
                      <i>{criteriaText(Number(v.operator))}</i>
                    </section>
                    <section>
                      <span>Value: </span> <i>{v?.value}</i>
                    </section>
                  </div>
                  {open && (
                    <section
                      className={`form ${
                        cr === v ? 'form-open' : 'from-close'
                      }`}
                    >
                      <Form
                        onSubmit={onSubmit}
                        extendButton={extendButton}
                        onChange={{ value, setValue }}
                      >
                        <Form.Text
                          defaultValue={cr?.value}
                          label="Value"
                          field="value"
                        />
                        <Form.Select
                          defaultValue={() => defaultValueKey(cr?.key, key)}
                          label="Column"
                          field="key"
                          options={key}
                        />
                        {value.key && (
                          <>
                            {getJsonParse(value.key) && (
                              <Form.Select
                                defaultValue={() =>
                                  defaultValueParseKey(cr?.key)
                                }
                                label={`${JSON.parse(value.key)?.name} Column`}
                                field="relation"
                                options={
                                  JSON.parse(value.key)?.entity?.objects || []
                                }
                              />
                            )}
                          </>
                        )}
                        <Form.Select
                          defaultValue={cr?.operator}
                          label="Operator"
                          field="operator"
                          options={operator}
                        />
                      </Form>
                    </section>
                  )}
                  <button onClick={() => remove(v)} className="remove">
                    <i className="fas fa-times"></i>
                  </button>
                </li>
              ) : (
                <></>
              )}
            </>
          );
        })}
        <li>
          {open && (
            <section className={`form ${!cr ? 'form-open' : 'from-close'}`}>
              <Form
                onSubmit={onSubmit}
                extendButton={extendButton}
                onChange={{ value, setValue }}
              >
                <Form.Text label="Value" field="value" />
                <Form.Select label="Column" field="key" options={key} />
                {value.key && (
                  <>
                    {getJsonParse(value.key) && (
                      <Form.Select
                        label={`${JSON.parse(value.key)?.name} Column`}
                        field="relation"
                        options={JSON.parse(value.key)?.entity?.objects || []}
                      />
                    )}
                  </>
                )}
                <Form.Select
                  label="Operator"
                  field="operator"
                  options={operator}
                />
              </Form>
            </section>
          )}
          <button
            onClick={add}
            className={`add ${open && !cr ? 'active' : ''}`}
          >
            <i className="fas fa-plus"></i>
          </button>
        </li>
      </ul>
    </section>
  );
}

export default Filtered;
