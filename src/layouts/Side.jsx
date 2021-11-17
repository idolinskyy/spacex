import { Component } from 'react';
import { CompanyList } from '../components/CompanyList';
import './Side.css';

export class Side extends Component {
  render() {
    const { list, clickLink } = this.props;
    return (
      <aside className='side'>
        <CompanyList list={list} clickLink={clickLink}></CompanyList>
      </aside>
    );
  }
}
