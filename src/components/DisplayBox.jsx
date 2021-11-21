import { convert16 } from '../lib/util';

import './DisplayBox.css';

export function DisplayBox(props) {
  const width = props.width * 10;
  const bColor = `${convert16((width * 17) % 256)}${convert16(
    (width * 7) % 256,
  )}${convert16((width * 13) % 256)}`;

  const tColor = ((parseInt(bColor, 16) ^ 0xffffff) | 0x1000000)
    .toString(16)
    .substring(1);

  return (
    <div
      className='display-cargo__box'
      style={{
        width: `${width}%`,
        backgroundColor: `#${bColor}`,
        color: `#${tColor}`,
      }}
      title={props.width >= 0.8 ? '' : props.width}>
      {props.width < 0.8 ? '' : props.width}
    </div>
  );
}
