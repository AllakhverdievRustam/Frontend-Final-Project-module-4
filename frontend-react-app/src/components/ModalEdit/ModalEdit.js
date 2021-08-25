import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ModalEdit.scss';

const ModalEdit = ({
  ElementRecToModal,
  openModalEdit,
  Offset,
  limit,
  setCountAllReception,
  setReception,
  Sort,
  Filter }) => {
  const [nameEdit, setNameEdit] = useState('');
  const [doctorEdit, setDoctorEdit] = useState('');
  const [dateEdit, setDateEdit] = useState('');
  const [complaintEdit, setComplaintEdit] = useState('');
  const doctorArray = ['Doctor 1', 'Doctor 2', 'Doctor 3', 'Doctor 4', 'Doctor 5'];

  const { nameUser, nameDoctor, date, complaint, _id } = ElementRecToModal.edit;

  useEffect(() => {
    if (!nameEdit && !doctorEdit && !dateEdit && !complaintEdit) {
      setNameEdit(nameUser);
      setDoctorEdit(nameDoctor);
      setDateEdit(date);
      setComplaintEdit(complaint);
    }
  }, [ElementRecToModal,
    nameEdit,
    doctorEdit,
    dateEdit,
    complaintEdit,
    nameUser,
    nameDoctor,
    date,
    complaint,
    _id]);

  const user = JSON.parse(localStorage.getItem('user'));
  const { authorization } = user;

  const editReception = () => {
    axios.patch('http://localhost:8000/editReception',
      {
        _id,
        nameUser: nameEdit,
        nameDoctor: doctorEdit,
        date: dateEdit,
        complaint: complaintEdit,
        limit,
        offset: Offset,
        sortLable: Sort.lable,
        sortDirection: Sort.direction,
        firstDate: Filter.firstDate,
        lastDate: Filter.lastDate
      },
      {
        headers: { Authorization: authorization }
      }
    ).then(res => {
      setNameEdit('');
      setDoctorEdit('');
      setDateEdit('');
      setComplaintEdit('');
      openModalEdit(false);
      setCountAllReception(res.data.length);
      const result = res.data.data;
      setReception(result);
    });
  }

  const onClickCancel = () => {
    setNameEdit('');
    setDoctorEdit('');
    setDateEdit('');
    setComplaintEdit('');
    openModalEdit(false);
  }

  const disabledButtonEdit = !(nameEdit && doctorEdit && dateEdit && complaintEdit);

  return (
    <>
      <div
        className="show modal fade"
        id="editModal"
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
                Изменить прием
              </h5>
            </div>
            <div className="modal-body">
              <div className="add-block-edit w-100">
                <div className="inpun-block-edit">
                  <p>Имя:</p>
                  <input
                    onChange={(e) => setNameEdit(e.target.value)}
                    type="text"
                    name="user-name"
                    className="form-control w-100"
                    value={nameEdit || ''}
                  />
                </div>

                <div className="inpun-block-edit">
                  <p>Врач:</p>
                  <select
                    onChange={(e) => setDoctorEdit(e.target.value)}
                    className="form-select"
                    name="doctor-name"
                    id="inputGroupSelect01"
                    value={doctorEdit || ''}
                  >
                    <option>{doctorEdit}</option>
                    {
                      doctorArray.map((element, index) => (
                        element !== doctorEdit &&
                        <option
                          key={`key-${index}`}
                          value={element}
                        >
                          {element}
                        </option>
                      ))
                    }
                  </select>
                </div>

                <div className="inpun-block-edit">
                  <p>Дата:</p>
                  <input
                    onChange={(e) => setDateEdit(e.target.value)}
                    type="date"
                    name="date-name"
                    className="form-control"
                    value={dateEdit || ''}
                  />
                </div>

                <div className="inpun-block-edit">
                  <p>Жалобы:</p>
                  <input
                    onChange={(e) => setComplaintEdit(e.target.value)}
                    type="text"
                    name="complaint-name"
                    className="form-control w-100"
                    value={complaintEdit || ''}
                  />
                </div>
              </div>
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
                onClick={() => editReception()}
                disabled={disabledButtonEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
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
    openModalEdit: (value) => {
      dispatch({ type: 'OPEN-EDIT', payload: value });
    }
  })
)(ModalEdit);