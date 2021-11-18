import { CompanyItem } from './CompanyItem';
import './CompanyList.css';

export function CompanyList(props) {
  const { list = [], clickLink } = props;

  return (
    <ul className='company-list'>
      {list.length ? (
        list.map((item) => (
          <CompanyItem key={item.id} clickLink={clickLink} {...item} />
        ))
      ) : (
        <h4> No matches found ... &#128543; Try again</h4>
      )}
    </ul>
  );
}
