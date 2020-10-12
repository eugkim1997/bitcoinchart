import React from 'react';
import { Line } from 'react-chartjs-2';



const ChartView = (props) => {
  let data = {
    labels: props.dates,
    datasets: [
      {
        label: 'BTC',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: props.prices
      }
    ]
  };
  var options = {
    title: {
      display: true,
      text: 'Bitcoin Prices',
      fontSize: 20
    },
    legend: {
      display: true,
      position: 'right'
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };
  return (
    <div>
      <Line
        data={data}
        options={options}
      />
    </div>
  )
};

export default ChartView;