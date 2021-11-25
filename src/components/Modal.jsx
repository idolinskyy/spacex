import { useState } from 'react';
import './Modal.css';

export function Modal(props) {
  const { text } = props;

  const [visible, setVisible] = useState(true);

  const handleClick = (event) => {
    const target = event.target;
    if (
      target.classList.contains('modal__overlay') ||
      target.classList.contains('modal__close') ||
      target.classList.contains('button--ok')
    ) {
      setVisible(false);
    }
  };

  return (
    <div
      className={`modal__overlay ${visible ? 'open' : ''}`}
      onClick={handleClick}>
      <div className='modal__main'>
        <span className='modal__close' onClick={handleClick}>
          &#10008;
        </span>
        <h3 className='modal__text'>{text}</h3>
        <div className='modal__buttons'>
          <button className='button button--ok' onClick={handleClick}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
