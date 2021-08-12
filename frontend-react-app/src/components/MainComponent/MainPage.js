import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalDelete from '../ModalDelete/ModalDelete';
import ModalEdit from '../ModalEdit/ModalEdit';
import Header from '../HeaderComponent/Header';
import AddBlock from '../AddReceptionComponent/AddBlock';
import imgEdit from '../../source/images/edit.png';
import imgDelete from '../../source/images/delete.png';
import './MainPage.scss';

const MainPage = () => {
  const [receptions, setReceptions] = useState([]);
  const [elementRecEdit, setElementRecEdit] = useState({});
  const [elementRecDelete, setElementRecDelete] = useState({});
  const thLable = ['Имя', 'Врач', 'Дата', 'Жалобы', ''];

  const user = JSON.parse(localStorage.getItem('user'));
  const { authorization } = user;

  useEffect(() => {
    if (!receptions.length) {
      axios.get('http://localhost:8000/getAllReceptions',
        {
          headers: { Authorization: authorization }
        }
      ).then(res => {
        setReceptions(res.data.data);
      });
    }
  }, [receptions]);

  return (
    <div>
      <Header name='Приемы' flag={true} />

      <AddBlock setReceptions={setReceptions} />

      <div className="block-main w-100">
        <table className="table table-striped">
          <thead>
            <tr>
              {
                thLable.map((element, index) => (
                  <th key={`key-${index}`} scope="col">{element}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              receptions.map((element, index) => (
                <tr key={`key-${index}`}>
                  <td className="text-break">{element.nameUser}</td>
                  <td>{element.nameDoctor}</td>
                  <td>{element.date}</td>
                  <td className="text-break">{element.complaint}</td>
                  <td>
                    <div className="img-block">
                      <img
                        src={imgEdit}
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                        onClick={() => setElementRecEdit(element)}
                      />
                      <img
                        src={imgDelete}
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => setElementRecDelete(element)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <ModalDelete
        className="modal"
        id="#deleteModal"
        elementDel={elementRecDelete}
        setReceptions={setReceptions}
      />
      <ModalEdit
        className="modal"
        id="#editModal"
        elementEd={elementRecEdit}
        setReceptions={setReceptions}
      />
    </div>
  );
}

export default MainPage;