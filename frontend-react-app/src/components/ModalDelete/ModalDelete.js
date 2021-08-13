import React from 'react';
import axios from 'axios';

const ModalDelete = ({ elementDel, setReceptions, isOpen }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { authorization } = user;

  const deleteReception = () => {
    axios.delete(`http://localhost:8000/deleteReception?_id=${elementDel._id}`,
      {
        headers: {
          Authorization: authorization
        }
      }
    ).then(res => {
      setReceptions(res.data.data);
      isOpen(false);
    });
  }

  const onClickCancel = () => {
    isOpen(false);
  }

  return (
    <div
      className="show modal fade"
      id="deleteModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title"
              id="exampleModalLabel"
            >
              Удалить прием
            </h5>
          </div>
          <div className="modal-body">
            Вы действительно хотите удалить прием?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => onClickCancel()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => deleteReception()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;