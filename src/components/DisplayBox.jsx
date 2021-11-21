import { convert16 } from '../lib/util';

import './DisplayBox.css';

export function DisplayBox(props) {
  const width = props.width * 10;

  return (
    <div
      className='display-cargo__box'
      style={{
        width: `${width}%`,
        backgroundColor: `#${convert16((width * 17) % 256)}${convert16(
          (width * 7) % 256,
        )}${convert16((width * 13) % 256)}`,
      }}>
      {props.width}
    </div>
  );
}
