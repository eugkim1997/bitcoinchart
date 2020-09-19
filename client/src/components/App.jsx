import React from 'react';
import axios from 'axios';
import ChartView from './ChartView.jsx';
import DateForm from './DateForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '2010-07-17',
      endDate: '',
      dates: [],
      prices: []
    };
  }

  setTodayDate() {
    var d = new Date();
    var today = d.toJSON().substring(0, 10)
    this.setState({ endDate: today }, () => {
      console.log('endDate set to today');
      this.getBitcoinData();
    })
  }

  setNewDates(newStart, newEnd) {
    this.setState({ startDate: newStart, endDate: newEnd }, () => {
      console.log('new dates set');
      this.getBitcoinData();
    });
  }

  getBitcoinData() {
    axios.get(`/bitcoinData`, {
      params: {
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }
    })
      .then((res) => {
        this.processData(res.data)
      })
      .catch((err) => {
        console.error('error getting bitcoin data: ', err)
      });
  }

  processData(data) {
    var dateArr = [];
    var priceArr = [];
    for (var key in data) {
      dateArr.push(key);
      priceArr.push(data[key]);
    }
    this.setState({ dates: dateArr, prices: priceArr }, () => {
      console.log('dates & prices have been populated');
    })
  }

  componentDidMount() {
    this.setTodayDate();
  };

  render() {
    return (
      <div>
        <ChartView dates={this.state.dates} prices={this.state.prices} />
        <br />
        <DateForm setDates={this.setNewDates.bind(this)} />
      </div>
    )
  };
}

export default App;
