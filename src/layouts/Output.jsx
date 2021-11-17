import { Component } from 'react';
import './Output.css'

export class Output extends Component {
  state = {
    boxes: '',
    count: 0,
  };

  componentDidMount() {
    this.setState({ boxes: this.props.company.boxes });
  }

  boxesChange = (event) => {
    this.setState({ boxes: event.target.value });
  };

  render() {
    const { name, email } = this.props.company;

    return (
      <div className='output'>
        <h1 className='output__company'>{name}</h1>
        <a href={`mailto:${email}`} className='output__mail'>
          {email}
        </a>
        <p className='output__result'>
          Number of required cargo bays <span>{this.state.count}</span>
        </p>
        <p className='output__caption'>Cargo boxes</p>
        <input
          type='text'
          value={this.state.boxes}
          onChange={this.boxesChange}
        />
      </div>
    );
  }
}
