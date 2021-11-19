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
        cargoBays: calculateCargoBays(data[0]?.boxes?.split(',') || []),
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
          cargoBays: calculateCargoBays(data[0]?.boxes?.split(',') || []),
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

    window.history.pushState({ path: e.target.href }, '', e.target.href);

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
      currentCompany: [],
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

  onCheckInput = (event) => {
    event.target.value = event.target.value.replace(/[^ ,.0-9]/g, '');
  };

  saveLocal = () => {
    localStorage.setItem('spacex-data', JSON.stringify(this.state.allList));
  };

  render() {
    const { list } = this.state;
    return (
      <>
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
              checkInput={this.onCheckInput}
              cargoBays={this.state.cargoBays}></Output>
          ) : (
            <h3 className='main__no-data'>
              {!this.state.isLoad
                ? "Local data not found ...Please click 'Load' to load data from server."
                : ''}
            </h3>
          )}
        </main>
        <div className='error-info'>Maybe we should not?</div>
      </>
    );
  }
}
