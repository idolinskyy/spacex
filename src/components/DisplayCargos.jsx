import { DisplayCargoItem } from './DisplayCargoItem';
import './DisplayCargos.css';

export function DisplayCargos(props) {
  const { cargoList = [], hide } = props;

  if (hide) {
    return '';
  } else {
    return (
      <div className='display-cargos'>
        {cargoList?.length
          ? cargoList.map((item, index) => (
              <DisplayCargoItem key={index} listBoxes={item} />
            ))
          : ''}
      </div>
    );
  }
}
