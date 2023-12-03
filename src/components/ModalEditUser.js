import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { postcareateUser, updateUser } from "../services/usersivice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ModalEditUser = (props) => {
  const { show, handleClose, datauser, handleEditUserFromModal } = props;
  const [name, setname] = useState("");
  const [job, setjob] = useState("");

  const handlEditUser = async (userId) => {
    let res = await updateUser(userId, name, job);
    if (res && res.updatedAt) {
      handleEditUserFromModal({
        first_name: name,
        id: datauser.id,
      });
    }
    handleClose();
    toast.success("update user competele");
  };
  useEffect(() => {
    if (show) {
      setname(datauser.first_name);
    }
  }, [datauser]);

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
            <Modal.Title>Edit a User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div class="form-group">
                <label className="form-lable" for="exampleInputEmail1">
                  Name
                </label>
                <input
                  type="email"
                  class="form-control"
                  value={name}
                  onChange={(event) => setname(event.target.value)}
                />
              </div>
              <div class="form-group">
                <label className="form-lable">Job</label>
                <input
                  type="job"
                  class="form-control"
                  value={job}
                  onChange={(event) => setjob(event.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handlEditUser()}>
              Comfirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ModalEditUser;
