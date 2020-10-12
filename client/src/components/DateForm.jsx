import React from 'react';

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
    this.props.setDates(this.state.startDate, this.state.endDate);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div>Enter in the format yyyy-mm-dd!</div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Start Date:
          <input type="date" value={this.state.startDate} onChange={this.handleStartDate} />
          </label>
          <label>
            End Date:
          <input type="date" value={this.state.endDate} onChange={this.handleEndDate} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default DateForm;