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
            <DisplayCargoItem key={index} listBoxes={item} />
          ))
        : ''}
    </div>
  );
}
