import { CompanyItem } from './CompanyItem';

export function CompanyList(props) {
  const { list = [], clickLink } = props;

  return (
    <ul className='company-list'>
      {list.length ? (
        list.map((item) => (
          <CompanyItem key={item.id} clickLink={clickLink} {...item} />
        ))
      ) : (
        <h4>Ничего не найдено :(</h4>
      )}
    </ul>
  );
}
