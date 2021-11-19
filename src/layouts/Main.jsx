import { Component } from 'react';
import { Header } from './Header';
import { Output } from './Output';
import { Side } from './Side';
import { calculateCargoBays } from '../lib/algo';

import './Main.css';

export class Main extends Component {
  state = {
    isLoad: false,
    list: [],
    allList: [],
    currentCompany: {},
    cargoBays: [],
  };

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('spacex-data')) || [];
    if (data.length) {
      this.setState({
        list: data,
        allList: data,
        isLoad: !!data.length,
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
          isLoad: data.length,
          currentCompany: data[0],
        });
        localStorage.setItem('spacex-data', JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  clickLink = (e) => {
    e.preventDefault();

    const currCompany = this.state.list.filter((item, i) => {
      return item.id === e.target.id;
    })[0];

    this.setState((state, props) => ({
      currentCompany: currCompany,
      cargoBays: calculateCargoBays(currCompany.boxes?.split(',') || []),
    }));
  };

  changeFilter = (e) => {
    this.setState({
      list: this.state.allList.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    });
  };

  onResetBoxes = (event) => {
    const currCompany = this.state.currentCompany;
    currCompany.boxes = event.target.value;
    this.setState((state, props) => ({
      currentCompany: currCompany,
      cargoBays: calculateCargoBays(currCompany.boxes.split(',')),
    }));
  };

  saveLocal = () => {
    localStorage.setItem('spacex-data', JSON.stringify(this.state.allList));
  };

  render() {
    const { list } = this.state;
    return (
      <main className='main'>
        <Header
          loadClick={this.loadFromJSON}
          saveClick={this.saveLocal}
          changeFilter={this.changeFilter}></Header>
        <Side
          list={list}
          clickLink={this.clickLink}
          isLoad={this.state.isLoad}></Side>
        {list.length ? (
          <Output
            company={this.state.currentCompany}
            resetBoxes={this.onResetBoxes}
            cargoBays={this.state.cargoBays}></Output>
        ) : (
          <h3 className='main__no-data'>
            Local data not found ...
            <br />
            Please click "Load" to load data from server.
          </h3>
        )}
      </main>
    );
  }
}
