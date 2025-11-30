import React, { ReactElement, useEffect, useState } from 'react';

import Modal from '@/components/Forms/modal';
import { useFormContext } from 'react-form';

import { IForm } from '@/services';

import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ModalUpdate from '@/components/Forms/modal/ModalUpdate';
import { Payload } from '@/middleware/reactReducerAction';

type IProps = {
  label: string;
  field: string;
  fieldText?: any;
  children: ReactElement | Array<ReactElement>;
  defaultData?: Array<any> | undefined;
  returnData?: boolean;
  required?: boolean;
  validating?: any | undefined;
  min?: number;
  max?: number;
  action?: IForm['actions'];
  divisive?: string;
};

function MultiBox(props: IProps) {
  const [open, setOpen] = useState(false);

  const [success, setSuccess] = useState<boolean | string>(false);
  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccess(false), 2500);
    }
  }, [success]);
  const [err, setErr] = useState<boolean | string>(false);
  useEffect(() => {
    if (err) {
      setTimeout(() => setErr(false), 2500);
    }
  }, [err]);

  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const [modalUpdateData, setModalUpdateData] = useState<any>({});

  const [multiData, setmultiData] = useState<Array<any>>(
    props?.defaultData || [],
  );

  const formInstance = useFormContext();

  useEffect(() => {
    const n = {
      [props.field]: multiData,
    };

    formInstance.setValues({ ...formInstance.values, ...n });
  }, [multiData]);

  const ReactSwal = withReactContent(Swal);
  const dispatch: any = useDispatch();
  const update = async (v: any) => {
    await setModalUpdateData(v);
    setModalUpdate(true);
  };
  const del = (v: any) => {
    if (v?.id) {
      ReactSwal.fire({
        title: 'Are you sure?',
        text: 'You can not take this back!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete!',
      }).then((result) => {
        if (result.isConfirmed) {
          props?.action?.delete &&
            dispatch(props?.action?.delete(v)).then(() =>
              setmultiData(multiData.filter((f: any) => f !== v)),
            );
        }
      });
    } else {
      setmultiData(multiData.filter((f: any) => f !== v));
    }
  };

  const [k, setK] = useState<boolean>(false);
  const onSubmit = (value: any) => {
    const f = multiData.find((f: any) => f === value);
    if (!f) {
      setmultiData([...multiData, value]);
      setK(true);
    }
  };
  useEffect(() => {
    if (k) {
      setTimeout(() => setK(false), 1000);
    }
  }, [k]);

  const onSubmitUpdate = (value: any) => {
    dispatch(props?.action?.update(value))
      .then((payload: Payload) => {
        if (!payload.err) {
          const newMultiData = multiData.map((v: any) => {
            if (v === modalUpdateData) {
              return {
                ...value,
              };
            } else {
              return {
                ...v,
              };
            }
          });
          setmultiData(newMultiData);

          setSuccess('Güncellendi...');
          setModalUpdateData({});
          setModalUpdate(false);
        } else {
          setErr('Güncellenirken hata oluştu...');
          setModalUpdateData({});
          setModalUpdate(false);
        }
      })
      .catch(() => {
        setErr('Güncellenirken hata oluştu...');
        setModalUpdateData({});
        setModalUpdate(false);
      });
  };

  const [divisive, setDivisive] = useState<Array<any> | undefined>(
    props.divisive ? [] : undefined,
  );
  useEffect(() => {
    if (props.divisive) {
      const data: Array<number | undefined> = Array.from(
        new Set(
          multiData?.map((m: any) => {
            if (m?.environment?.id) {
              return Number(m?.environment?.id);
            } else {
              return undefined;
            }
          }),
        ),
      );
      setDivisive(data);
    } else {
      setDivisive(undefined);
    }
  }, []);
  return (
    <section className="multibox">
      <div onClick={() => setOpen(!open)} className="title">
        {props.label} <i className="fa fa-plus"></i>
      </div>

      {!divisive ? (
        <ul>
          {multiData?.map((v: any, k: number) => (
            <li key={k}>
              <>
                {Array.isArray(props?.children) ? (
                  <>
                    {props.children?.map((cv: any, ck: number) => {
                      return (
                        <React.Fragment key={ck}>
                          <b>{cv?.props?.label}: </b>{' '}
                          <span>
                            {typeof props?.fieldText === 'function' &&
                              props.fieldText(
                                v?.[cv?.props?.field],
                                cv?.props?.field,
                                v,
                                cv,
                              )}
                          </span>
                        </React.Fragment>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {' '}
                    <React.Fragment>
                      <b>{props?.children?.props?.label}: </b>{' '}
                      <span>
                        {typeof props?.fieldText === 'function' &&
                          props.fieldText(
                            v?.[props?.children?.props?.field],
                            props?.children?.props?.field,
                            v,
                            props?.children,
                          )}
                      </span>
                    </React.Fragment>
                  </>
                )}
              </>
              <i onClick={() => del(v)} className="fa fa-times"></i>
              {v?.id && (
                <i
                  style={{ right: 20 }}
                  onClick={() => update(v)}
                  className="far fa-edit"
                ></i>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <>
          {divisive.map((d: number, key: number) => {
            return (
              <ol key={key}>
                <h6 className="title">
                  {
                    multiData?.find((f) => f?.environment?.id === d)
                      ?.environment?.name
                  }
                </h6>
                <ul>
                  {multiData
                    .filter((f: any) => f?.environment?.id === d)
                    ?.map((v: any, k: number) => {
                      return (
                        <li key={key + '-' + k}>
                          <>
                            {Array.isArray(props?.children) ? (
                              <>
                                {props.children?.map((cv: any, ck: number) => {
                                  return (
                                    <React.Fragment key={ck}>
                                      <b>{cv?.props?.label}: </b>{' '}
                                      <span>
                                        {typeof props?.fieldText ===
                                          'function' &&
                                          props.fieldText(
                                            v?.[cv?.props?.field],
                                            cv?.props?.field,
                                            v,
                                            cv,
                                          )}
                                      </span>
                                    </React.Fragment>
                                  );
                                })}
                              </>
                            ) : (
                              <>
                                {' '}
                                <React.Fragment>
                                  <b>{props?.children?.props?.label}: </b>{' '}
                                  <span>
                                    {typeof props?.fieldText === 'function' &&
                                      props.fieldText(
                                        v?.[props?.children?.props?.field],
                                        props?.children?.props?.field,
                                        v,
                                        props?.children,
                                      )}
                                  </span>
                                </React.Fragment>
                              </>
                            )}
                          </>
                          <i onClick={() => del(v)} className="fa fa-times"></i>
                          {v?.id && (
                            <i
                              style={{ right: 20 }}
                              onClick={() => update(v)}
                              className="far fa-edit"
                            ></i>
                          )}
                        </li>
                      );
                    })}
                </ul>
              </ol>
            );
          })}
        </>
      )}

      <Modal onSubmit={onSubmit} name={props.label} isShow={{ open, setOpen }}>
        <>
          {props.children}
          <div className={`success-data ${k ? 't-0' : 't-100'}`}>
            <span>Eklendi...</span>
          </div>
        </>
      </Modal>

      {modalUpdateData?.id && (
        <>
          {modalUpdate && (
            <ModalUpdate
              onSubmit={onSubmitUpdate}
              name={modalUpdateData?.name}
              isShow={{ open: modalUpdate, setOpen: setModalUpdate }}
              footer={false}
              data={modalUpdateData}
            >
              <>
                {props.children}
                <div className={`success-data ${k ? 't-0' : 't-100'}`}>
                  <span>Güncellendi...</span>
                </div>
              </>
            </ModalUpdate>
          )}
        </>
      )}

      <div className={`err ${err ? 't-0' : 't-100'}`}>
        <span>{err}</span>
      </div>
      <div className={`success ${success ? 't-0' : 't-100'}`}>
        <span>{success}</span>
      </div>
    </section>
  );
}

export default MultiBox;
