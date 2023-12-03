import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../services/usersivice";
import { Toast } from "bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const ModalConfirm = (props) => {
  const { show, handleClose, datauserdelete, handleDeleteuserfromModal } =
    props;
  const handleConfiemDelete = async () => {
    let res = await deleteUser(datauserdelete.id);
    if (res && res.statusCode === 204) {
      handleClose();
      toast.success("Delete user succees");
      handleDeleteuserfromModal(datauserdelete);
    } else {
      toast.error("delete fail");
    }
  };

  return (
    <>
      {" "}
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete a User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              This action can't br undone ! Do you want to delete thi user
              <br />
              <b>email={datauserdelete.email}</b>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleConfiemDelete()}>
              Comfirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ModalConfirm;
