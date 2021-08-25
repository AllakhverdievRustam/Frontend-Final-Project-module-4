import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './AddBlock.scss';

const AddBlock = ({ Offset, limit, setCountAllReception, setReception, Sort, Filter }) => {
  const [name, setName] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [complaint, setComplaint] = useState('');
  const doctorArray = ['', 'Doctor 1', 'Doctor 2', 'Doctor 3', 'Doctor 4', 'Doctor 5'];

  const addReception = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { authorization } = user;

    axios.post('http://localhost:8000/createNewReception',
      {
        nameUser: name,
        nameDoctor: doctor,
        date,
        complaint,
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
      setName('');
      setDoctor('');
      setDate('');
      setComplaint('');
      setCountAllReception(res.data.length);
      const result = res.data.data;
      setReception(result);
    });
  }

  const disabledButton = !(name && doctor && date && complaint);

  return (
    <div className="add-block w-100">
      <div className="add-block-all">
        <div className="inpun-block">
          <p>Имя:</p>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="user-name"
            className="form-control w-100"
            value={name}
          />
        </div>

        <div className="inpun-block">
          <p>Врач:</p>
          <select
            onChange={(e) => setDoctor(e.target.value)}
            className="form-select"
            name="doctor-name"
            id="inputGroupSelect01"
            value={doctor}
          >
            {
              doctorArray.map((element, index) => (
                <option key={`key-${index}`} value={element}>{element}</option>
              ))
            }
          </select>
        </div>

        <div className="inpun-block">
          <p>Дата:</p>
          <input
            onChange={(e) => setDate(e.target.value)}
            type="date"
            name="date-name"
            className="form-control"
            value={date}
          />
        </div>

        <div className="inpun-block">
          <p>Жалобы:</p>
          <input
            onChange={(e) => setComplaint(e.target.value)}
            type="text"
            name="complaint-name"
            className="form-control w-100"
            value={complaint}
          />
        </div>

        <button
          onClick={() => addReception()}
          type="button"
          className="btn-add btn btn-outline-dark mt-4"
          disabled={disabledButton}
        >
          Добавить
        </button>
      </div>
    </div>
  );
}

export default connect(
  state => ({
    Offset: state.Offset,
    Sort: state.Sort,
    Filter: state.Filter
  }),
  dispatch => ({
    setCountAllReception: (value) => {
      dispatch({ type: 'COUNT-ALL-REC', payload: value });
    },
    setReception: (value) => {
      dispatch({ type: 'GET-RECEPTIONS', payload: value });
    }
  })
)(AddBlock);