import './Filter.css';

export function Filter(props) {
  return (
    <div className='filter'>
      <span className='filter__icon'>&#128269;</span>
      <input
        className='filter__input'
        type='text'
        name=''
        onChange={props.changeFilter}
      />
    </div>
  );
}
