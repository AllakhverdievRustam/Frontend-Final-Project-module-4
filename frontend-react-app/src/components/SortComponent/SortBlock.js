import React, { useState } from 'react';
import './SortBlock.scss';

const SortBlock = ({ receptions, setReceptions }) => {
  const [sortLable, setSortLable] = useState('');
  const [sortDirection, setSortDirection] = useState('По возрастанию');
  const sortArrLable = [{ lable: 'None', value: '' }, { lable: 'Имя', value: 'nameUser' }, { lable: 'Доктор', value: 'nameDoctor' }, { lable: 'Дата', value: 'date' }];
  const sortArrDirection = ['По возрастанию', 'По убыванию'];

  const onChangeLable = (e) => {
    if (e.target.value !== '') {
      receptions.sort((a, b) => a[e.target.value] > b[e.target.value] ? -1 : a[e.target.value] < b[e.target.value] ? 1 : 0);
      setReceptions([...receptions]);
    }
    console.log(receptions);
    setSortLable(e.target.value);
  }

  const onChangeDirection = (e) => {
    if (sortLable !== '') {
      switch (e.target.value) {
        case 'По возрастанию':
          receptions.sort((a, b) => a[sortLable] > b[sortLable] ? -1 : a[sortLable] < b[sortLable] ? 1 : 0);
          setReceptions([...receptions]);
          console.log(receptions);
          break;

        case 'По убыванию':
          receptions.sort((a, b) => a[sortLable] < b[sortLable] ? -1 : a[sortLable] > b[sortLable] ? 1 : 0);
          setReceptions([...receptions]);
          console.log(receptions);
          break;

        default:
          break;
      }
    }
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
        name="sort-lable-name"
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
            name="sort-direction-name"
            id="inputGroupSelect01"
            value={sortDirection}
          >

            {
              sortArrDirection.map((element, index) => (
                <option
                  key={`key-${index}`}
                  value={element}
                >
                  {element}
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