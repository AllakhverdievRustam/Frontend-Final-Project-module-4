import React, { useState, useEffect } from 'react';
import './SortBlock.scss';

const SortBlock = ({ receptions, setReceptions, setUseEffectDo, lengthReceptionArr, setLengthReceptionArr }) => {
  const [sortLable, setSortLable] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const sortArrLable = [
    { lable: 'None', value: '' },
    { lable: 'Имя', value: 'nameUser' },
    { lable: 'Доктор', value: 'nameDoctor' },
    { lable: 'Дата', value: 'date' }
  ];
  const sortArrDirection = [
    { value: 'asc', title: 'По возрастанию' },
    { value: 'desc', title: 'По убыванию' }
  ];

  useEffect(() => {
    if (sortLable !== '') {
      switch (sortDirection) {
        case 'asc':
          receptions.sort((a, b) => a[sortLable] < b[sortLable] ? -1 : a[sortLable] > b[sortLable] ? 1 : 0);
          setReceptions([...receptions]);
          break;

        case 'desc':
          receptions.sort((a, b) => a[sortLable] > b[sortLable] ? -1 : a[sortLable] < b[sortLable] ? 1 : 0);
          setReceptions([...receptions]);
          break;

        default:
          break;
      }
    }
  }, [lengthReceptionArr, sortDirection, sortLable]);

  const onChangeLable = (e) => {
    if (e.target.value === '') {
      setSortLable(e.target.value);
      setUseEffectDo(true);
    } else {
      setSortLable(e.target.value);
    }
  }

  const onChangeDirection = (e) => {
    setSortDirection(e.target.value);
  }

  return (
    <div className="sort-block">
      <p>
        Сортировать по:
      </p>

      <select
        onChange={(e) => onChangeLable(e)}
        className="sort-input form-select"
        id="inputGroupSelect01"
        value={sortLable}
      >
        {
          sortArrLable.map((element, index) => (
            <option
              key={`key-${index}`}
              value={element.value}
            >
              {element.lable}
            </option>
          ))
        }
      </select>

      {
        sortLable &&
        <>
          <p>
            Направление:
          </p>

          <select
            onChange={(e) => onChangeDirection(e)}
            className="sort-input form-select"
            id="inputGroupSelect01"
            value={sortDirection}
          >

            {
              sortArrDirection.map((element, index) => (
                <option
                  key={`key-${index}`}
                  value={element.value}
                >
                  {element.title}
                </option>
              ))
            }
          </select>
        </>
      }
    </div>
  );
}

export default SortBlock;