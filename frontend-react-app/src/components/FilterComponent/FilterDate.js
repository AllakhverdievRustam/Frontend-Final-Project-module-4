import React, { useState, useEffect } from 'react';
import Svg from '../Elements/SvgAddFilter/SvgAddFilter';
import imgDelete from '../../source/images/delete.png';
import './FilterDate.scss';

const FilterDate = ({ receptions, setUseEffectDo, setReceptions, lengthReceptionArr, setLengthReceptionArr }) => {
  const [flagAddFilter, setFlagAddFilter] = useState(false);
  const [firstDate, setFirstDate] = useState('');
  const [lastDate, setLastDate] = useState('');

  useEffect(() => {
    filterReceptions();
  }, [lengthReceptionArr]);

  const onClickDeleteFilter = async () => {
    setFlagAddFilter(false);
    setFirstDate('');
    setLastDate('');
    await setUseEffectDo(true);
  }

  const filterReceptions = () => {
    if (!lastDate.length && firstDate.length) {
      receptions = receptions.filter(element => element.date >= firstDate)
      setReceptions(receptions);
      setLengthReceptionArr(receptions.length);
    } else if (!firstDate.length && lastDate.length) {
      receptions = receptions.filter(element => element.date <= lastDate)
      setReceptions(receptions);
      setLengthReceptionArr(receptions.length);
    } else if (lastDate.length && firstDate.length) {
      receptions = receptions.filter(element =>
        (element.date >= firstDate) && (element.date <= lastDate)
      )
      setReceptions(receptions);
      setLengthReceptionArr(receptions.length);
    }
  }

  return (
    <div className="filter-block">
      {
        (!flagAddFilter) ?
          <div className="add-filter-block">
            <p>
              Добавить фильтр по дате:
            </p>

            <a onClick={(e) => setFlagAddFilter(true)}>
              <Svg />
            </a>

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
              onClick={() => filterReceptions()}
            >
              Фильтровать
            </button>

            <img
              src={imgDelete}
              onClick={() => onClickDeleteFilter()}
            />
          </>
      }
    </div>
  );
}

export default FilterDate;