import React from 'react';
import { Filter } from '../components/Filter';
import './Header.css';

export function Header(props) {
  const { loadClick, changeFilter } = props;
  return (
    <div className='header'>
      <span className='header__caption'>Cargo Planner</span>
      <Filter changeFilter={changeFilter}></Filter>
      <button className='header__button' onClick={loadClick}>
        Load
      </button>
      <button className='header__button'>Save</button>
    </div>
  );
}
