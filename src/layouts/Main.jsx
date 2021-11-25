import { Component } from 'react';
import { Header } from './Header';
import { Output } from './Output';
import { Side } from './Side';
import { calculateCargoBays } from '../lib/algo';
import { normalizeUrl } from '../lib/util';
import { Modal } from '../components/Modal';
import './Main.css';

export class Main extends Component {
  state = {
    isLoad: false, // Загрузка данных успешна?
    list: [], // Текущий список компаний (например после фильтра)
    allList: [], // Список всех загруженых компаний
    currentCompany: {}, // Текущая компания для оттображения
    cargoBays: [], // Список грузов в текущей компании
  };

  // Изменяет состояние при смене хеша
  changeHash(list) {
    const hash = window.location.hash ? window.location.hash.substr(1) : '';
    const computedCompany = list.filter((item) => {
      return normalizeUrl(item.name) === hash;
    })[0];
    if (computedCompany) {
      this.setState((state, props) => ({
        currentCompany: computedCompany,
        cargoBays: calculateCargoBays(computedCompany.boxes?.split(',') || []),
      }));
    } else {
      this.setState((state, props) => ({
        currentCompany: state.list[0],
        cargoBays: calculateCargoBays(state.list[0]?.boxes?.split(',') || []),
      }));
    }
  }

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

    this.changeHash(data);

    window.addEventListener('hashchange', (event) => {
      this.changeHash(this.state.allList);
    });
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

    const computedCompany = this.state.list.filter((item, i) => {
      return item.id === e.target.id;
    })[0];

    window.history.pushState({ path: e.target.href }, '', e.target.href);

    this.setState((state, props) => ({
      currentCompany: computedCompany,
      cargoBays: calculateCargoBays(computedCompany.boxes?.split(',') || []),
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

  changeBoxes = (event) => {
    const computedCompany = this.state.currentCompany;
    computedCompany.boxes = event.target.value;
    this.setState((state, props) => ({
      currentCompany: computedCompany,
      cargoBays: calculateCargoBays(computedCompany.boxes.split(',')),
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
          {list.length ? (
            <>
              <Side
                list={list}
                clickLink={this.clickLink}
                isLoad={this.state.isLoad}></Side>

              <Output
                company={this.state.currentCompany}
                onChangeBoxes={this.changeBoxes}
                checkInput={this.onCheckInput}
                cargoBays={this.state.cargoBays}></Output>
            </>
          ) : !this.state.isLoad ? (
            <Modal text="Local data not found... Please click 'Load' button to load data from server." />
          ) : (
            <h3>No matches found ... Try again</h3>
          )}
        </main>
        <div className='error-info'>Maybe we should not?</div>
      </>
    );
  }
}
