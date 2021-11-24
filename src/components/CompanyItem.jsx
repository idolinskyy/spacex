import { normalizeUrl } from '../lib/util';
import './CompanyItem.css';

export function CompanyItem(props) {
  const { id, name, clickLink } = props;
  return (
    <li className='company-item'>
      <a
        id={id}
        href={`#${normalizeUrl(name)}`}
        className='company-item__link'
        onClick={clickLink}>
        {name}
      </a>
    </li>
  );
}
