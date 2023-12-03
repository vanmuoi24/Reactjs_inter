import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/usersivice";
import ReactPaginate from "react-paginate";
import Modaladdnew from "./Modaladdnewuser";
import Button from "react-bootstrap/Button";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import "./table.scss";
import _, { conforms } from "lodash";
import { CSVLink } from "react-csv";
const Tableuser = (props) => {
  const [listUser, setListUser] = useState([]);
  const [totaluser, settotaluser] = useState(0);
  const [totalpage, settotalpage] = useState(0);
  const [isShowModalAddnew, setModalAddnew] = useState(false);
  const [isshowEdituser, setisshowEditUser] = useState(false);
  const [isshowConfirmDelete, setisshowConfirmDelete] = useState(false);
  const [datauserdelete, setdatauserdelete] = useState({});
  const [datauser, setdatauser] = useState({});
  const [dataexport, setdataexport] = useState([]);
  const [sortby, setsortby] = useState("asc");
  const [sortfiled, setsortfiled] = useState("id");
  const [keywork, setkeywork] = useState([]);
  const handleClose = () => {
    setModalAddnew(false);
    setisshowEditUser(false);
    setisshowConfirmDelete(false);
  };
  useEffect(() => {
    getUser(1);
  }, []);

  const getUser = async (page) => {
    let res = await fetchAllUsers(page);
    if (res && res.data) {
      setListUser(res.data);
      settotaluser(res.total);
      settotalpage(res.total_pages);
    }
  };
  const handlePageClick = (event) => {
    getUser(+event.selected + 1);
  };
  const handleEdit = (user) => {
    setisshowEditUser(true);
    setdatauser(user);
  };

  const handleupdateTable = (user) => {
    setListUser([user, ...listUser]);
  };

  const handleEditUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    let index = listUser.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    setListUser(cloneListUser);
  };
  const handleClickDelete = (user) => {
    setisshowConfirmDelete(true);
    setdatauserdelete(user);
    let cloneListUser = _.cloneDeep(listUser);
  };
  const handleDeleteuserfromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = cloneListUser.filter((item) => item.id !== user.id);
    setListUser(cloneListUser);
  };
  const handlesort = (sortby, sortfiled) => {
    setsortby(sortby);
    setsortfiled(sortfiled);
    console.log(sortby, sortfiled);
    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = _.orderBy(cloneListUser, [sortfiled], [sortby]);
    setListUser(cloneListUser);
  };
  const handleSearch = (event) => {
    let tern = event.target.value;

    if (tern) {
      let cloneListUser = _.cloneDeep(listUser);
      cloneListUser = cloneListUser.filter((item) => item.email.includes(tern));
      setListUser(cloneListUser);
    } else {
      getUser(1);
    }
  };
  const getusersExport = (event, done) => {
    let resukt = [];
    if (listUser && listUser.length > 0) {
      resukt.push(["ID", "EMAIL", "FIRST NAME", "LAST NAME"]);
      listUser.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        resukt.push(arr);
      });
      setdataexport(resukt);
      done();
    }
  };
  return (
    <>
      <div className=" my-3  justify-content-between d-sm-flex  ">
        <p>
          <h3>List User</h3>
        </p>
        <div className=" d-flex gap-3 ">
          <label className="btn btn-success" htmlFor="test">
            <i className="fa-solid fa-file-import mx-2 "></i>
            Import
          </label>
          <input type="file" id="test" hidden></input>
          <CSVLink
            filename={"user.csv"}
            className="btn btn-primary"
            data={dataexport}
            asyncOnClick={true}
            onClick={getusersExport}
          >
            <i className="fa-solid fa-file-export mx-2"></i>
            Export
          </CSVLink>
          <button
            className="btn btn-primary"
            onClick={() => setModalAddnew(true)}
          >
            <i className="fa-solid fa-plus mx-2"></i>
            Add new user
          </button>{" "}
        </div>
      </div>
      <div className=" col-4 my-3 col-sm-12 ">
        {" "}
        <input
          className="form-control"
          placeholder="Search User by Email..."
          onChange={(event) => handleSearch(event)}
        />
      </div>
      <Table striped bordered hover className="table_header">
        <thead>
          <tr>
            <th>
              <div className="th_sort">
                <span>ID</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down"
                    onClick={() => handlesort("desc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up"
                    onClick={() => handlesort("asc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="th_sort">
                <span>First Name</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down"
                    onClick={() => handlesort("desc", "first_name")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up"
                    onClick={() => handlesort("asc", "first_name")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((list, index) => (
              <tr key={`user-${index}`}>
                <td>{list.id}</td>
                <td>{list.email}</td>
                <td>{list.first_name}</td>
                <td>{list.last_name}</td>
                <tr className=" d-flex gap-3 ">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleClickDelete(list)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => handleEdit(list)}
                  >
                    Edit
                  </button>
                </tr>
              </tr>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalpage}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        ///////////////
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <Modaladdnew
        show={isShowModalAddnew}
        handleClose={handleClose}
        handleupdateTable={handleupdateTable}
      />
      <ModalEditUser
        show={isshowEdituser}
        datauser={datauser}
        handleClose={handleClose}
        handleEditUserFromModal={handleEditUserFromModal}
      />

      <ModalConfirm
        show={isshowConfirmDelete}
        handleClose={handleClose}
        datauserdelete={datauserdelete}
        handleDeleteuserfromModal={handleDeleteuserfromModal}
      />
    </>
  );
};

export default Tableuser;
