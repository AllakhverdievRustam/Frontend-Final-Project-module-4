import React, { useState, useEffect } from 'react';
import Svg from '../Elements/SvgAddFilter/SvgAddFilter';
import imgDelete from '../../source/images/delete.png';
import './FilterDate.scss';

const FilterDate = ({ receptions, setReceptions, setUseEffectDo, lengthReceptionArr, setLengthReceptionArr }) => {
  const [flagAddFilter, setFlagAddFilter] = useState(false);
  const [firstDate, setFirstDate] = useState('');
  const [lastDate, setLastDate] = useState('');
  let filterArr = [];

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
    if (lastDate.length === 0 && firstDate.length !== 0) {
      filterArr = [];
      receptions.forEach(element => {
        if (element.date > firstDate) filterArr.push(element);
      });
      setReceptions([...filterArr]);
      setLengthReceptionArr(filterArr.length);
    } else if (firstDate.length === 0 && lastDate.length !== 0) {
      filterArr = [];
      receptions.forEach(element => {
        if (element.date < lastDate) filterArr.push(element);
      });
      setReceptions([...filterArr]);
      setLengthReceptionArr(filterArr.length);
    } else if (lastDate.length !== 0 && firstDate.length !== 0) {
      filterArr = [];
      receptions.forEach(element => {
        if (element.date > firstDate && element.date < lastDate) filterArr.push(element);
      });
      setReceptions([...filterArr]);
      setLengthReceptionArr(filterArr.length);
    }
  }

  return (
    <div className="filter-block">
      {
        (!flagAddFilter) &&
        <div className="add-filter-block">
          <p>
            Добавить фильтр по дате:
          </p>

          <a onClick={(e) => setFlagAddFilter(true)}>
            <Svg />
          </a>

        </div>
      }

      {
        (flagAddFilter) &&
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
            className="btn btn-outline-dark"
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