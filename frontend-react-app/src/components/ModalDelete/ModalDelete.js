import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const ModalDelete = ({
  Offset,
  limit,
  setCountAllReception,
  ElementRecToModal,
  setReception,
  openModalDelete,
  Sort,
  Filter }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { authorization } = user;

  const deleteReception = () => {
    axios.delete(`http://localhost:8000/deleteReception?_id=${ElementRecToModal.delete._id}&limit=${limit}&offset=${Offset}&sortLable=${Sort.lable}&sortDirection=${Sort.direction}&firstDate=${Filter.firstDate}&lastDate=${Filter.lastDate}`,
      {
        headers: {
          Authorization: authorization
        }
      }
    ).then(res => {
      openModalDelete(false);
      setCountAllReception(res.data.length);
      const result = res.data.data;
      setReception(result);
    });
  }

  const onClickCancel = () => {
    openModalDelete(false);
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

export default connect(
  state => ({
    Offset: state.Offset,
    ElementRecToModal: state.ElementRecToModal,
    Sort: state.Sort,
    Filter: state.Filter
  }),
  dispatch => ({
    setCountAllReception: (value) => {
      dispatch({ type: 'COUNT-ALL-REC', payload: value });
    },
    setReception: (value) => {
      dispatch({ type: 'GET-RECEPTIONS', payload: value });
    },
    openModalDelete: (value) => {
      dispatch({ type: 'OPEN-DELETE', payload: value });
    }
  })
)(ModalDelete);