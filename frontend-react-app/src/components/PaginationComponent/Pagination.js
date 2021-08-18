import React from 'react';
import './Pagination.scss';

const Pagination = ({ setOffset, limit, countAllReception, setUseEffectDo }) => {
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
        {
          arrNunPage.map((element, index) => (
            <li key={`key-${index}`} className="page-item">
              <a onClick={() => changePage(element)} className="pag-block page-link">{element + 1}</a>
            </li>
          ))
        }
      </ul>
    </nav>
  );
}

export default Pagination;