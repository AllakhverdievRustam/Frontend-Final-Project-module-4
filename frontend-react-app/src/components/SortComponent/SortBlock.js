import React from 'react';
import './SortBlock.scss';

const SortBlock = ({sortLable, setSortLable, sortDirection, setSortDirection, setUseEffectDo}) => {
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

  const onChangeLable = (e) => {
    setSortDirection('asc');
    const result = e.target.value;
    if (!result) {
      setSortLable(result);
      setSortDirection('');
      setUseEffectDo(true);
    } else {
      setSortLable(result);
      setUseEffectDo(true);
    }
  }

  const onChangeDirection = (e) => {
    setSortDirection(e.target.value);
    setUseEffectDo(true);
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