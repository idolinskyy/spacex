/*
	Компонент для размещения фильтра, кнопок управления
*/

import React from 'react';
import { Filter } from '../components/Filter';
import './Header.css';

export function Header(props) {
  const { loadClick, changeFilter, saveClick } = props;
  return (
    <div className='header'>
      <span className='header__logo'>Cargo Planner</span>
      <Filter changeFilter={changeFilter}></Filter>
      <div className='header__wrapper'>
        <button className='header__button load' onClick={loadClick}>
          Load
        </button>
        <button className='header__button save' onClick={saveClick}>
          Save
        </button>
      </div>
    </div>
  );
}
