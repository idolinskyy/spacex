import React, { useEffect, useState } from 'react';
import { DisplayCargos } from '../components/DisplayCargos';
import { sort } from '../lib/util';

import './Output.css';

export function Output(props) {
  const [boxes, setBoxes] = useState('');
  const [hideDisplay, setHideDisplay] = useState(false);

  const { name, email } = props.company;
  const { cargoBays } = props;

  useEffect(() => {
    setBoxes(props.company.boxes || '');
  }, [props.company.boxes]);

  const click = (event) => {
    setHideDisplay(!hideDisplay);
  };

  return (
    <div className='output'>
      <h1 className='output__company'>
        {name || 'Please select a company...'}
      </h1>
      <a href={`mailto:${email}`} className='output__mail'>
        {email}
      </a>
      <p className='output__result'>
        Number of required cargo bays{' '}
        <button className='output__button' onClick={click}>
          {cargoBays?.length || 0}
        </button>
      </p>
      <p className='output__caption'>Cargo boxes</p>
      <input
        type='text'
        value={boxes}
        onChange={props.onChangeBoxes}
        onInput={props.checkInput}
      />
      <p className='output__error'>{cargoBays?.error || ''}</p>
      <hr></hr>
      <DisplayCargos cargoList={sort(cargoBays)} hide={hideDisplay} />
    </div>
  );
}
