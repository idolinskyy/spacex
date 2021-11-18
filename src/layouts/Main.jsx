import { Component } from 'react';
import { Header } from './Header';
import { Output } from './Output';
import { Side } from './Side';

import './Main.css';

export class Main extends Component {
  state = {
    total: 0,
    list: [],
    allList: [],
    currentCompany: {},
  };

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('spacex-data')) || [];
    if (data.length) {
      this.setState({
        list: data,
        allList: data,
        total: data.length,
        currentCompany: data[0],
      });
    }
  }

  loadFromJSON = () => {
    fetch('shipments.json')
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        this.setState({
          list: data,
          allList: data,
          total: data.length,
        });
        localStorage.setItem('spacex-data', JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  clickLink = (e) => {
    e.preventDefault();
    this.setState({
      currentCompany: this.state.list.filter((item, i) => {
        return item.id === e.target.id;
      })[0],
    });
  };

  changeFilter = (e) => {
    this.setState({
      list: this.state.allList.filter((item) =>
        item.name.includes(e.target.value),
      ),
    });
  };

  saveLocal = () => {};

  render() {
    const { list } = this.state;
    return (
      <main className='main'>
        <Header
          loadClick={this.loadFromJSON}
          saveClick={this.saveLocal}
          changeFilter={this.changeFilter}></Header>
        <Side list={list} clickLink={this.clickLink}></Side>
        <Output company={this.state.currentCompany}></Output>
      </main>
    );
  }
}
