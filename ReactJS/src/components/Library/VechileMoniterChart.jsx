import React from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './Library.css';
class VechileMoniterChart extends React.Component {
  constructor(props) {
    super(props);
  }

  //return labels[this.pos];
  render() {
    if (this.props && this.props.MonitorData) {
      let res = this.props.MonitorData;
      // let res2 = [];
      // for (let i = 0; i < res.length; i += 2) {
      //   if (i + 1 < res.length) {
      //     let tAframe_timestamp2 =
      //       res[i].tAframe_timestamp + res[i + 1].tAframe_timestamp;
      //     let taccident2 = res[i].taccident + res[i + 1].taccident;
      //     let t = {};
      //     //t['frame_timestamp']=frame_timestamp2;
      //     t['tAframe_timestamp'] = tAframe_timestamp2;
      //     t['taccident'] = taccident2;

      //     res2.push(t);
      //     // console.log(frame_timestamp2)
      //   }
      // }
      // res = res2;
      let categoriesdata = res.map((item) => item['tAframe_timestamp']);
      let tAaccident = res.map((item) => item['tAccidentStatus']);
      var labels = [0, 1];

      this.state = {
        options: {
          tooltip: {
            formatter: function () {
              return (
                '<br> Accident status : ' + this.y + '</br/>Second: :' + this.x
              );
            },
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            itemMarginTop: 10,
            itemMarginBottom: 10,
          },

          series: [
            {
              name: 'Accident prediction (<80%)',
              threshold: 0,
              data: tAaccident,
              color: 'green',
              negativeColor: 'blue',
            },
            {
              name: 'Accident prediction (>80%)',
              threshold: 80,
              data: tAaccident,
              color: 'red',
              negativeColor: 'transparent',
            },
          ],
          chart: {
            type: 'line',
            height: 350,
            // width: auto,
            // marginRight: 50,
            // marginLeft: 50,
          },
          stroke: {
            curve: 'stepline',
            type: 'line',
            width: [0, 4],
          },
          dataLabels: {
            enabled: true,
          },
          title: {
            text: 'Accident Chart',
            align: 'center',
          },
          yAxis: {
            tickInterval: 10,
            min: 0,
            max: 100,
            title: {
              text: 'Prcentage',
              // // marginRight: 50,
            },

            labels: {
              formatter: function () {
                return Math.abs(this.value);
              },
            },
          },
          markers: {
            hover: {
              sizeOffset: 4,
            },
          },
        },
      };
    }

    return (
      <div id="chart">
        <HighchartsReact
          options={this.state.options}
          series={this.state.series}
          type="line"
          // width={1400}
          height={450}
          highcharts={Highcharts}
        />
        <span className="timeinSecond">Time in second</span>
      </div>
    );
  }
}

export default VechileMoniterChart;
