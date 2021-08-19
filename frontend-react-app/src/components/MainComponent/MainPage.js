import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalDelete from '../ModalDelete/ModalDelete';
import ModalEdit from '../ModalEdit/ModalEdit';
import Header from '../HeaderComponent/Header';
import AddBlock from '../AddReceptionComponent/AddBlock';
import SortBlock from '../SortComponent/SortBlock';
import FilterDate from '../FilterComponent/FilterDate';
import Pagination from '../PaginationComponent/Pagination';
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
  const [offset, setOffset] = useState(0);
  const [sortLable, setSortLable] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [countAllReception, setCountAllReception] = useState(0);
  const thLable = ['Имя', 'Врач', 'Дата', 'Жалобы', ''];

  const limit = 5;

  const user = JSON.parse(localStorage.getItem('user'));
  const { authorization } = user;

  useEffect(() => {
    if (useEffectDo) {
      axios.post('http://localhost:8000/getAllReceptions',
        {
          limit,
          offset,
          sortLable,
          sortDirection,
          firstDate,
          lastDate
        },
        {
          headers: { Authorization: authorization }
        }
      ).then(res => {
        setCountAllReception(res.data.length);
        const result = res.data.data;
        setUseEffectDo(false);
        setReceptions(result);
      });
    }
  }, [useEffectDo]);

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

      <AddBlock
        setReceptions={setReceptions}
        setCountAllReception={setCountAllReception}
        limit={limit}
        offset={offset}
        sortLable={sortLable}
        sortDirection={sortDirection}
        firstDate={firstDate}
        lastDate={lastDate}
      />

      <div className="block-main w-100">
        <SortBlock
          setUseEffectDo={setUseEffectDo}
          sortLable={sortLable}
          setSortLable={setSortLable}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />

        <FilterDate
          setUseEffectDo={setUseEffectDo}
          firstDate={firstDate}
          setFirstDate={setFirstDate}
          lastDate={lastDate}
          setLastDate={setLastDate}
        />

        <table className="table table-striped">
          <thead>
            <tr>
              {
                thLable.map((element, index) => (
                  <th
                    key={`key-${index}`}
                    scope="col"
                  >
                    {element}
                  </th>
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
                        alt="edit reception"
                      />
                      <img
                        src={imgDelete}
                        onClick={() => onClickDelete(element)}
                        alt="delete reception"
                      />
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <Pagination
          setOffset={setOffset}
          limit={limit}
          countAllReception={countAllReception}
          setUseEffectDo={setUseEffectDo}
          offset={offset}
        />
      </div>

      {
        opentModalDelete &&
        <ModalDelete
          elementDel={elementRecDelete}
          isOpen={setOpentModalDeelete}
          setReceptions={setReceptions}
          setCountAllReception={setCountAllReception}
          limit={limit}
          offset={offset}
          sortLable={sortLable}
          sortDirection={sortDirection}
          firstDate={firstDate}
          lastDate={lastDate}
        />
      }

      {
        opentModalEdit &&
        <ModalEdit
          elementEd={elementRecEdit}
          isOpen={setOpentModalEdit}
          setReceptions={setReceptions}
          setCountAllReception={setCountAllReception}
          limit={limit}
          offset={offset}
          sortLable={sortLable}
          sortDirection={sortDirection}
          firstDate={firstDate}
          lastDate={lastDate}
        />
      }
    </div>
  );
}

export default MainPage;