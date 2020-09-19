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
    console.log(newStart, newEnd);
    if (!newStart) {
      this.setState({endDate: newEnd}, () => {
        console.log('new endDate set');
        this.getBitcoinData();
      });
    } else if (!newEnd) {
      this.setState({startDate: newStart}, () => {
        console.log('new startDate set');
        this.getBitcoinData();
      });
    } else {
      this.setState({startDate: newStart}, () => {
        this.setState({endDate: newEnd}, () => {
          console.log('new dates set');
          this.getBitcoinData();
        });
      });
    }
  }

  getBitcoinData() {
    axios.get(`/bitcoinData`, {
      params: {
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }
    })
      .then((res) => {
        console.log('successfully got bitcoin data: ', res.data);
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
    this.setState({ dates: dateArr }, () => {
      console.log('dates have been populated');
      this.setState({ prices: priceArr }, () => {
        console.log('prices have been populated');
      })
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
        <DateForm setDates={this.setNewDates.bind(this)}/>
      </div>
    )
  };
}

export default App;
