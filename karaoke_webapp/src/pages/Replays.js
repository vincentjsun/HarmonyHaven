import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { callMeMaybe, thingy } from '../components/SongPitches';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend
} from 'chart.js';
import { notes } from '../Title';
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend
)
function Replays() {
  const [test, setTest] = useState([]);

  useEffect(() => {
    setTest(notes);
    console.log("vincentivneicnienft ---- " + test);
  }, [])

    const [time, setTime] = useState(new Date());
    const minval = 50;
    const maxval = 550;
    const original = callMeMaybe;
    // let cover = notes;
    const cover = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 245, 247, 247, 245, 245, 247, 218, 253, 253, 253, 253, 248, 253, 253, 253, 246, 249, 246, -1, 255, 257, 255, 255, 247, -1, -1, -1, 247, 247, 247, 247, 217, 213, 217, 217, 117, 218, 218, 125, 125, 193, 193, 292, 247, 247, 247, 247, 249, 245, 247, 252, 253, 247, 221, 248, 248, 248, 248, 245, 247, 248, 253, 248, 248, 146, 125, 125, 125, 125, 125, 247, 246, 247, 247, -1, 245, 245, 221, 436, 436, 436, 221, 221, 221, 197, 197, 197, 201, 295, 295];
    const data = {
      labels: original,
      datasets: [{
        label:'Original Pitch',
        data: original,
        backgroundColor: 'black',
        borderColor: 'black',
        pointBorderColor: 'black',
        fill: true,
        tension: 0.3,
      },
      {
        label:'Your Pitch',
        data: test,
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
    return (
      <div className="replays">
        <h1>Replays</h1>
        <Line className='replay'
        data = {data}
        options = {options}>

        </Line>
      </div>
    );
  }
  export default Replays;