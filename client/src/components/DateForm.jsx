import React from 'react';
import moment from 'moment'

class DateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: ''
    };

    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStartDate(event) {
    this.setState({ startDate: event.target.value });
  }

  handleEndDate(event) {
    this.setState({ endDate: event.target.value });
  }

  handleSubmit(event) {
    var start = moment(this.state.startDate, "YYYY-MM-DD", true);
    var end = moment(this.state.endDate, "YYYY-MM-DD", true);
    if (start.diff(moment("2010-07-17", "YYYY-MM-DD", true), 'days') < 0) {
      alert("Earliest possible date is 2010-07-17!");
    } else if (end.diff(moment().format('YYYY-MM-DD'), 'days') > 0) {
      alert("Latest possible date is today!");
    } else if (!start.isValid() || !end.isValid()) {
      alert("Dates must be in the format 'yyyy-mm-dd'!");
    } else if (end.diff(start, 'days') <= 0) {
      alert("End date must come after start date!");
    } else {
      this.props.setDates(this.state.startDate, this.state.endDate);
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div>Enter in the format yyyy-mm-dd!</div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Start Date:
          <input type="text" value={this.state.startDate} onChange={this.handleStartDate} />
          </label>
          <label>
            End Date:
          <input type="text" value={this.state.endDate} onChange={this.handleEndDate} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default DateForm;