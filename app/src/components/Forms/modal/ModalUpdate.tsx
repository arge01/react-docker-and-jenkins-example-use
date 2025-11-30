import React, { ReactElement, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Form from '@components/Forms';

type IProps = {
  isShow: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  name: string;
  children: ReactElement | Array<ReactElement>;
  button?: {
    name: string;
    onClick: any;
  };
  footer?: boolean;
  onSubmit?: any;
  data: any;
  validationFocus?: boolean;
  submitValidation?: boolean;
};

function ModalUpdate({
  isShow,
  name,
  children,
  button,
  onSubmit,
  footer,
  data,
  submitValidation = false,
  validationFocus = false,
}: IProps) {
  const location = useLocation();
  const { state } = location;

  const { open, setOpen } = isShow;
  const toggleModal = () => {
    setOpen(!open);
  };

  const [body, setBody] = useState<ReactElement | Array<ReactElement>>(
    children,
  );
  useEffect(() => {
    if (Array.isArray(children)) {
      setBody(children);
    } else {
      const a: Array<any> = [];
      const c: Array<any> = [];
      for (
        let index = 0;
        index < children?.props?.children?.[0]?.length;
        index++
      ) {
        const element = {
          ...children?.props?.children?.[0]?.[index],
          props: {
            ...children?.props?.children?.[0]?.[index]?.props,
            defaultValue:
              data[children?.props?.children?.[0]?.[index]?.props?.field],
          },
        };

        c[index] = element;
      }

      a[0] = [...c];
      a[1] = children?.props?.children?.[1];
      a[2] = children?.props?.children?.[2];

      const newData: ReactElement = {
        ...children,
        props: {
          ...children.props,
          children: [...a],
        },
      };
      setBody(newData);
    }
  }, [data]);
  return (
    <Modal
      isOpen={open}
      toggle={toggleModal}
      className={`modal-dialog modal-lg crud-table-modal kron-modal`}
    >
      <ModalHeader toggle={toggleModal}>{name}</ModalHeader>
      <ModalBody>
        <Form
          btn={{ name: 'Güncelle' }}
          extendButton={{ name: 'Kapat', onClick: toggleModal }}
          onSubmit={onSubmit}
          submitValidation={submitValidation}
          validationFocus={validationFocus}
        >
          {state?.data && (
            <>
              <Form.Hidden field="id" defaultValue={data?.id} />
              <Form.Hidden
                field="project.id"
                defaultValue={state?.data?.project?.id}
              />
            </>
          )}
          {body}
        </Form>
      </ModalBody>
      {footer && (
        <ModalFooter>
          <Button
            variant="success"
            type="submit"
            className="btn btn-success"
            onClick={button?.onClick}
          >
            {button?.name}
          </Button>
          <Button variant="info" className="btn btn-info" onClick={toggleModal}>
            Kapat
          </Button>
        </ModalFooter>
      )}
    </Modal>
  );
}

export default ModalUpdate;
