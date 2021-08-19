import React, { useState } from 'react';
import Svg from '../Elements/SvgAddFilter/SvgAddFilter';
import imgDelete from '../../source/images/delete.png';
import './FilterDate.scss';

const FilterDate = ({ firstDate, setFirstDate, lastDate, setLastDate, setUseEffectDo }) => {
  const [flagAddFilter, setFlagAddFilter] = useState(false);
  const [sortLable, setSortLable] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const onClickDeleteFilter = () => {
    setFlagAddFilter(false);
    setFirstDate('');
    setLastDate('');
    setUseEffectDo(true);
  }

  return (
    <div className="filter-block">
      {
        (!flagAddFilter) ?
          <div className="add-filter-block">
            <p>
              Добавить фильтр по дате:
            </p>

            <div
              onClick={() => setFlagAddFilter(true)}
              className="add-filter-button"
            >
              <Svg />
            </div>

          </div>
          :
          <>
            <div className="input-filter-block">
              <p>
                с :
              </p>

              <input
                onChange={(e) => setFirstDate(e.target.value)}
                type="date"
                className="form-control"
                value={firstDate}
              />
            </div>

            <div className="input-filter-block">
              <p>
                по :
              </p>

              <input
                onChange={(e) => setLastDate(e.target.value)}
                type="date"
                className="form-control"
                value={lastDate}
              />
            </div>

            <button
              type="button"
              className="btn-filter btn btn-outline-dark"
              onClick={() => setUseEffectDo(true)}
            >
              Фильтровать
            </button>

            <img
              src={imgDelete}
              onClick={() => onClickDeleteFilter()}
              alt="delete filter"
            />
          </>
      }
    </div>
  );
}

export default FilterDate;