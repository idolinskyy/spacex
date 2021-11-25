/*
	Компонент списка записей компаний в сайдбаре
*/

import { CompanyItem } from './CompanyItem';
import './CompanyList.css';

export function CompanyList(props) {
  const { list = [], clickLink } = props;

  return (
    <ul className='company-list'>
      {list.map((item) => (
        <CompanyItem key={item.id} clickLink={clickLink} {...item} />
      ))}
    </ul>
  );
}
