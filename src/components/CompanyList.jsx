import { CompanyItem } from './CompanyItem';
import './CompanyList.css';

export function CompanyList(props) {
  const { list = [], clickLink, isLoad } = props;

  return (
    <ul className='company-list'>
      {list.length ? (
        list.map((item) => (
          <CompanyItem key={item.id} clickLink={clickLink} {...item} />
        ))
      ) : (
        <h4> {isLoad ? 'No matches found ... Try again' : ''}</h4>
      )}
    </ul>
  );
}
