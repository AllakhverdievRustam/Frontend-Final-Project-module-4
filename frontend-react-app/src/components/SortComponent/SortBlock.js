import React from 'react';
import { connect } from 'react-redux';
import './SortBlock.scss';

const SortBlock = ({ setUseEffectDo, Sort, setSortLable, setSortDirection }) => {
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
        value={Sort.lable}
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
        Sort.lable &&
        <>
          <p>
            Направление:
          </p>

          <select
            onChange={(e) => onChangeDirection(e)}
            className="sort-input form-select"
            id="inputGroupSelect01"
            value={Sort.direction}
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

export default connect(
  state => ({
    Sort: state.Sort
  }),
  dispatch => ({
    setUseEffectDo: (value) => {
      dispatch({ type: 'USE-EFF-DO', payload: value });
    },
    setSortLable: (value) => {
      dispatch({ type: 'CHANGE-LABLE', payload: value });
    },
    setSortDirection: (value) => {
      dispatch({ type: 'CHANGE-DIRECTION', payload: value });
    }
  })
)(SortBlock);