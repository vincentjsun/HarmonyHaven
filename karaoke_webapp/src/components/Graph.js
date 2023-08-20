import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend
} from 'chart.js';
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend
)
function Graph(props) {
    const [time, setTime] = useState(new Date());
    const minval = 50;
    const maxval = 550;
    const original = props.message[0];
    const cover = props.message[1];
    const snipindex = Math.max(cover.length-20,0);
    const coversnippet = cover.slice(snipindex);
    const originalsnippet = original.slice(snipindex, Math.min(snipindex+70, original.length));
    const data = {
      labels: props.message[0],
      datasets: [{
        label:'Original Pitch',
        data: originalsnippet,
        backgroundColor: 'black',
        borderColor: 'black',
        pointBorderColor: 'black',
        fill: true,
        tension: 0.3,
      },
      {
        label:'Your Pitch',
        data: coversnippet,
        backgroundColor: 'red',
        borderColor: 'red',
        pointBorderColor: 'red',
        fill: true,
        tension: 0.3,
      }]
    };
    const options = {
      animation:{
        duration:0
      },
      elements: {
        point:{
            radius: 0
        }
     },
      plugins: {
        legend:true
      },
      scales: {
        x: {
          display: false
      },
        y: {
          min: minval,
          max: maxval
        }
      }
    }
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 100);
  
      return () => clearInterval(interval);
    }, []);
    return (
      <div className="graph">
        <Line 
        data = {data}
        options = {options}>

        </Line>
      </div>
    );
  }
  export default Graph;