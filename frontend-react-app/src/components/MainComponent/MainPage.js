import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalDelete from '../ModalDelete/ModalDelete';
import ModalEdit from '../ModalEdit/ModalEdit';
import Header from '../HeaderComponent/Header';
import AddBlock from '../AddReceptionComponent/AddBlock';
import SortBlock from '../SortComponent/SortBlock';
import imgEdit from '../../source/images/edit.png';
import imgDelete from '../../source/images/delete.png';
import './MainPage.scss';

const MainPage = () => {
  const [receptions, setReceptions] = useState([]);
  const [elementRecEdit, setElementRecEdit] = useState({});
  const [elementRecDelete, setElementRecDelete] = useState({});
  const [useEffectDo, setUseEffectDo] = useState(true);
  const [opentModalEdit, setOpentModalEdit] = useState(false);
  const [opentModalDelete, setOpentModalDeelete] = useState(false);
  const thLable = ['Имя', 'Врач', 'Дата', 'Жалобы', ''];

  const user = JSON.parse(localStorage.getItem('user'));
  const { authorization } = user;

  useEffect(() => {
    if (!receptions.length && useEffectDo) {
      axios.get('http://localhost:8000/getAllReceptions',
        {
          headers: { Authorization: authorization }
        }
      ).then(res => {
        setReceptions(res.data.data);
        setUseEffectDo(false);
      });
    } else {
      setUseEffectDo(false);
    }
  }, [receptions]);

  const onClickEdit = (element) => {
    setElementRecEdit(element);
    setOpentModalEdit(true);
  }

  const onClickDelete = (element) => {
    setElementRecDelete(element);
    setOpentModalDeelete(true);
  }

  return (
    <div>
      <Header name='Приемы' flag={true} />

      <AddBlock setReceptions={setReceptions} />

      <div className="block-main w-100">
        <SortBlock receptions={receptions} setReceptions={setReceptions} />

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
                        onClick={() => onClickEdit(element)}
                      />
                      <img
                        src={imgDelete}
                        onClick={() => onClickDelete(element)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {
        opentModalDelete &&
        <ModalDelete
          elementDel={elementRecDelete}
          setReceptions={setReceptions}
          isOpen={setOpentModalDeelete}
        />
      }

      {
        opentModalEdit &&
        <ModalEdit
          elementEd={elementRecEdit}
          setReceptions={setReceptions}
          isOpen={setOpentModalEdit}
        />
      }
    </div>
  );
}

export default MainPage;