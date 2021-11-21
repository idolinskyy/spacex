import React, { useEffect, useState } from 'react';
import { DisplayCargos } from '../components/DisplayCargos';
import { sort } from '../lib/util';

import './Output.css';

export function Output(props) {
  const [boxes, setBoxes] = useState('');

  const { name, email } = props.company;
  const { cargoBays } = props;

  useEffect(() => {
    setBoxes(props.company.boxes || '');
  }, [props.company.boxes]);

  return (
    <div className='output'>
      <h1 className='output__company'>
        {name || 'Please select a company...'}
      </h1>
      <a href={`mailto:${email}`} className='output__mail'>
        {email}
      </a>
      <p className='output__result'>
        Number of required cargo bays <span>{cargoBays?.length || 0}</span>
      </p>
      <p className='output__caption'>Cargo boxes</p>
      <input
        type='text'
        value={boxes}
        onChange={props.resetBoxes}
        onInput={props.checkInput}
      />
      <p className='output__error'>{cargoBays?.error || ''}</p>
      <hr></hr>
      <p className='output__display'>Placement of cargos</p>
      <DisplayCargos cargoList={sort(cargoBays)}></DisplayCargos>
    </div>
  );
}
