/*
	Компонент отображения грузового отсека с ящиками
*/

import { DisplayBox } from './DisplayBox';
import './DisplayCargoItem.css';

export function DisplayCargoItem(props) {
  const { listBoxes } = props;
  return (
    <div className='display-cargo__item'>
      {listBoxes?.length
        ? listBoxes.map((item, index) => (
            <DisplayBox key={index} width={item} />
          ))
        : ''}
    </div>
  );
}
