export function CompanyItem(props) {
  const { id, name, clickLink } = props;
  return (
    <li className='company-item'>
      <a
        id={id}
        href={`${name.replaceAll(/[& ]/g, '-')}`}
        className='company-item__link'
        onClick={clickLink}>
        {name}
      </a>
    </li>
  );
}
