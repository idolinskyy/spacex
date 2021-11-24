/*
	Компонент отображения для всех заполненых отсеков
*/

import { DisplayCargoItem } from './DisplayCargoItem';
import './DisplayCargos.css';

export function DisplayCargos(props) {
  const { cargoList = [], hide } = props;

  return (
    <div
      className={`display-cargos ${
        !hide ? 'display-cargos--show' : 'display-cargos--hide'
      }`}>
      {cargoList?.length
        ? cargoList.map((item, index) => (
            <div key={index} className='display-cargos__wrapper'>
              <span key={index} className='display-cargos__index'>
                {index + 1}
              </span>
              <DisplayCargoItem key={'-' + index} listBoxes={item} />
            </div>
          ))
        : ''}
    </div>
  );
}
