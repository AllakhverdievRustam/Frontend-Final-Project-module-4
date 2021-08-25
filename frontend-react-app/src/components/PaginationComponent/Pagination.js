import React from 'react';
import { connect } from 'react-redux';
import './Pagination.scss';

const Pagination = ({ setOffset, limit, CountAllReception, setUseEffectDo, Offset }) => {
  const countPages = Math.ceil(CountAllReception / limit);

  const arrNunPage = [];
  for (let i = 0; i < countPages; i++) {
    arrNunPage.push(i);
  }

  const changePage = (element) => {
    setOffset(element);
    setUseEffectDo(true);
  }

  const onClickFirstPage = () => {
    setOffset(0);
    setUseEffectDo(true);
  }

  const onClickLastPage = () => {
    setOffset(arrNunPage[arrNunPage.length - 1]);
    setUseEffectDo(true);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <div
            onClick={() => onClickFirstPage()}
            className="pag-block page-link"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </div>
        </li>
        {
          arrNunPage.map((element, index) => (
            <li
              key={`key-${index}`}
              className={`page-item ${element === Offset ? 'active' : ''}`}
            >
              <div
                onClick={() => changePage(element)}
                className="pag-block page-link"
              >
                {element + 1}
              </div>
            </li>
          ))
        }
        <li className="page-item">
          <div
            onClick={() => onClickLastPage()}
            className="pag-block page-link"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default connect(
  state => ({
    Offset: state.Offset,
    CountAllReception: state.CountAllReception
  }),
  dispatch => ({
    setOffset: (value) => {
      dispatch({ type: 'OFFSET', payload: value });
    },
    setUseEffectDo: (value) => {
      dispatch({ type: 'USE-EFF-DO', payload: value });
    }
  })
)(Pagination);