import React from 'react';
import './Pagination.scss';

const Pagination = ({ setOffset, limit, countAllReception, setUseEffectDo, offset }) => {
  const countPages = Math.ceil(countAllReception / limit);

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
              className={`page-item ${element === offset ? 'active' : ''}`}
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

export default Pagination;