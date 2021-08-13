import React, { useState } from 'react';
import axios from 'axios';
import './AddBlock.scss';

const AddBlock = ({ setReceptions }) => {
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
        date: date,
        complaint: complaint
      },
      {
        headers: { Authorization: authorization }
      }
    ).then(res => {
      setName('');
      setDoctor('');
      setDate('');
      setComplaint('');
      setReceptions(res.data.data);
    });
  }

  const disabledButton = !(name && doctor && date && complaint);

  return (
    <div className="add-block w-100">
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
        type="button" className="btn btn-outline-dark mt-4"
        disabled={disabledButton}
      >
        Добавить
      </button>
    </div >
  );
}

export default AddBlock;