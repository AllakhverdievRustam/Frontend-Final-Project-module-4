import { combineReducers } from "redux";
import Error from './error';
import Offset from './offset';
import CountAllReception from './countAllReception';
import UseEffectDo from './useEffectDo';
import Reception from './reception';
import OpenModal from './openModal';
import ElementRecToModal from './elementRecToModal';
import Sort from './sort';
import Filter from './filter';

export default combineReducers({
  Error,
  Offset,
  CountAllReception,
  UseEffectDo,
  Reception,
  OpenModal,
  ElementRecToModal,
  Sort,
  Filter
});