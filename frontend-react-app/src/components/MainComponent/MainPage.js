import React, { useEffect } from 'react';
import { connect } from 'react-redux';
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

const MainPage = ({
  Offset,
  setCountAllReception,
  UseEffectDo,
  setUseEffectDo,
  Reception,
  setReception,
  OpenModal,
  openModalDelete,
  openModalEdit,
  sendElemRecToDelete,
  sendElemRecToEdit,
  Sort,
  Filter }) => {
  const thLable = ['Имя', 'Врач', 'Дата', 'Жалобы', ''];

  const { lable, direction } = Sort;
  const { firstDate, lastDate } = Filter;

  const limit = 5;

  const user = JSON.parse(localStorage.getItem('user'));
  const { authorization } = user;

  useEffect(() => {
    if (UseEffectDo) {
      axios.post('http://localhost:8000/getAllReceptions',
        {
          limit,
          offset: Offset,
          sortLable: lable,
          sortDirection: direction,
          firstDate: firstDate,
          lastDate: lastDate
        },
        {
          headers: { Authorization: authorization }
        }
      ).then(res => {
        setCountAllReception(res.data.length);
        const result = res.data.data;
        setUseEffectDo(false);
        setReception(result);
      });
    }
  }, [UseEffectDo,
    Offset,
    lable,
    direction,
    firstDate,
    lastDate,
    authorization,
    setCountAllReception,
    setUseEffectDo,
    setReception]);

  const onClickEdit = (element) => {
    sendElemRecToEdit(element);
    openModalEdit(true);
  }

  const onClickDelete = (element) => {
    sendElemRecToDelete(element);
    openModalDelete(true);
  }

  return (
    <div>
      <Header name='Приемы' flag={true} />

      <AddBlock
        limit={limit}
      />

      <div className="block-main w-100">
        <SortBlock />

        <FilterDate />

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
              Reception.map((element, index) => (
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
          limit={limit}
        />
      </div>

      {
        OpenModal.modalDelete &&
        <ModalDelete
          limit={limit}
        />
      }

      {
        OpenModal.modalEdit &&
        <ModalEdit
          limit={limit}
        />
      }
    </div>
  );
}

export default connect(
  state => ({
    Offset: state.Offset,
    UseEffectDo: state.UseEffectDo,
    Reception: state.Reception,
    OpenModal: state.OpenModal,
    Sort: state.Sort,
    Filter: state.Filter
  }),
  dispatch => ({
    setCountAllReception: (value) => {
      dispatch({ type: 'COUNT-ALL-REC', payload: value });
    },
    setUseEffectDo: (value) => {
      dispatch({ type: 'USE-EFF-DO', payload: value });
    },
    setReception: (value) => {
      dispatch({ type: 'GET-RECEPTIONS', payload: value });
    },
    openModalDelete: (value) => {
      dispatch({ type: 'OPEN-DELETE', payload: value });
    },
    openModalEdit: (value) => {
      dispatch({ type: 'OPEN-EDIT', payload: value });
    },
    sendElemRecToDelete: (value) => {
      dispatch({ type: 'ELEMENT-TO-DELETE', payload: value });
    },
    sendElemRecToEdit: (value) => {
      dispatch({ type: 'ELEMENT-TO-EDIT', payload: value });
    }
  })
)(MainPage);