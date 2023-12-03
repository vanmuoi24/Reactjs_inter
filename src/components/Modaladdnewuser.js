import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { postCreateUser } from "../services/usersivice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Modaladdnew = (props) => {
  const { show, handleClose, handleupdateTable } = props;
  const [name, setname] = useState("");
  const [job, setjob] = useState("");
  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);
    if (res && res.id) {
      handleClose();
      setname("");
      setjob("");
      toast.success("Create User success !!");
      handleupdateTable({ first_name: name, id: res.id });
    } else {
      toast.error("Creatr fail !");
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
            <Modal.Title>Modal heading</Modal.Title>
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
            <Button variant="primary" onClick={() => handleSaveUser()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Modaladdnew;
