/*
	Компонент для фильтра компаний в сайдбаре
*/

import './Filter.css';

export function Filter(props) {
  return (
    <div className='filter'>
      <span className='filter__icon'>&#128269;</span>
      <input
        className='filter__input'
        type='text'
        placeholder='Company filter'
        onChange={props.changeFilter}
      />
    </div>
  );
}
