import React, { useEffect, useState } from 'react';
import './Output.css';

export function Output(props) {
  const [boxes, setBoxes] = useState('');
  const [count, setCount] = useState(0);

  const { name, email } = props.company;

  useEffect(() => {
    setBoxes(props.company.boxes);
  }, [props.company.boxes]);

  const boxesChange = (event) => {
    setBoxes(event.target.value);
    //TODO: algo!!!
  };

  return (
    <div className='output'>
      <h1 className='output__company'>{name}</h1>
      <a href={`mailto:${email}`} className='output__mail'>
        {email}
      </a>
      <p className='output__result'>
        Number of required cargo bays <span>{count}</span>
      </p>
      <p className='output__caption'>Cargo boxes</p>
      <input type='text' value={boxes} onChange={boxesChange} />
    </div>
  );
}
