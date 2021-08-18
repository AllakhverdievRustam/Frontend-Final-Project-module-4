import React from 'react';
import './Pagination.scss';

const Pagination = ({ setOffset, limit, countAllReception, setUseEffectDo, offset }) => {
  const countPages = Math.ceil(countAllReception / limit);

  const arrNunPage = [];
  for (let i = 0; i < countPages; i++) {
    arrNunPage.push(i);
  }

  const changePage = (element) => {
    if (element === -1) {
      setOffset(0);
    } else if (element === -2) {
      setOffset(arrNunPage[arrNunPage.length - 1]);
    } else setOffset(element);
    setUseEffectDo(true);
  }

  return (
    <nav>
      <ul className="pagination">
        <li class="page-item">
          <a onClick={() => changePage(-1)} class="pag-block page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {
          arrNunPage.map((element, index) => (
            element === offset ?
              <li key={`key-${index}`} className="page-item active">
                <a onClick={() => changePage(element)} className="pag-block page-link">{element + 1}</a>
              </li> :
              <li key={`key-${index}`} className="page-item">
                <a onClick={() => changePage(element)} className="pag-block page-link">{element + 1}</a>
              </li>
          ))
        }
        <li class="page-item">
          <a onClick={() => changePage(-2)} class="pag-block page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;