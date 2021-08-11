import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../HeaderComponent/Header';
import AddBlock from '../AddReceptionComponent/AddBlock';
import imgEdit from '/home/user/Desktop/Work/Module 4/FinalProject/Frontend/frontend-react-app/src/source/images/edit.png';
import imgDelete from '/home/user/Desktop/Work/Module 4/FinalProject/Frontend/frontend-react-app/src/source/images/delete.png';
import './MainPage.scss';

const MainPage = () => {
  const [receptions, setReceptions] = useState([]);
  const [idDelete, setIdDelete] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const { authorization } = user;

  useEffect(async () => {
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

  const deleteReception = () => {
    axios.delete('http://localhost:8000/deleteReception',
      {
        headers: { 
          Authorization: authorization,
          _id: idDelete
        }
      }
    ).then(res => {
      setReceptions(res.data.data);
    });
  }

  return (
    <div>
      <Header name='Приемы' flag={true} />

      <AddBlock setReceptions={setReceptions} />

      <div className="block-main w-100">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Врач</th>
              <th scope="col">Дата</th>
              <th scope="col">Жалобы</th>
              <th scope="col"></th>
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
                      />
                      <img
                        src={imgDelete}
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => setIdDelete(element._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>


      {/* Modal window delete reception */}
      <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Удалить прием</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Вы действительно хотите удалить прием?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal" onClick={() => deleteReception()}>Delete</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal window edit reception */}
      <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Изменить прием</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-outline-primary">Delete</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default MainPage;