import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Form from '@components/Forms';

type IProps = {
  isShow: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  name: string;
  children: React.ReactNode;
  button?: {
    name: string;
    onClick: any;
  };
  footer?: boolean;
  onSubmit?: any;
  validationFocus?: boolean;
  submitValidation?: boolean;
};

function index({
  isShow,
  name,
  children,
  onSubmit,
  button,
  footer,
  submitValidation = false,
  validationFocus = false,
}: IProps) {
  const { open, setOpen } = isShow;
  const toggleModal = () => {
    setOpen(!open);
  };
  return (
    <Modal
      isOpen={open}
      toggle={toggleModal}
      className={`modal-dialog modal-lg crud-table-modal kron-modal`}
    >
      <ModalHeader toggle={toggleModal}>{name}</ModalHeader>
      <ModalBody>
        <Form
          extendButton={{ name: 'Kapat', onClick: toggleModal }}
          submitValidation={submitValidation}
          validationFocus={validationFocus}
          onSubmit={onSubmit}
        >
          {children}
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

export default index;
