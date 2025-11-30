import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';

type Props = {
  data: string | undefined;
  setData: React.Dispatch<React.SetStateAction<string | undefined>>;
};

function PopUpModal({ data, setData }: Props) {
  const close = () => setData(undefined);
  return (
    <Modal isOpen={data ? true : false} toggle={close} className="modal">
      <ModalBody>
        <img src={data} alt="" style={{ minHeight: '70vh' }} />
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-end" style={{ paddingTop: 15 }}>
          <Button color="danger" onClick={close}>
            Cancel
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default PopUpModal;
