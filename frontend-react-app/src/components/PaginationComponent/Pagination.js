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

  return (
    <nav>
      <ul className="pagination">
        <li class="page-item">
          <a onClick={() => setOffset(0)} class="pag-block page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {
          arrNunPage.map((element, index) => (
            <li key={`key-${index}`} className={`page-item ${element === offset ? 'active' : ''}`}>
              <a onClick={() => changePage(element)} className="pag-block page-link">{element + 1}</a>
            </li>
          ))
        }
        <li class="page-item">
          <a onClick={() => setOffset(arrNunPage[arrNunPage.length - 1])} class="pag-block page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;