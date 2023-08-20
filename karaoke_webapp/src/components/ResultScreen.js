import React from 'react';

let score = 0;
let combo = 0;
let index_count = 0;
const ResultScreen = ({ user, orig, perc }) => {
  perc.push(user);
  let list = perc[0];

  function removeLeadingMinusOnes(list) {
    let index = 0;
    while (index < list.length && list[index] === -1) {
      index++;
    }
    return list.slice(index);
  }

  function calculateAverages(list, chunkSize) {
    const filteredList = list.filter(value => value <= 1000); // Filter out values above 3000
    const averagedArray = [];
    
    for (let i = 0; i < filteredList.length; i += chunkSize) {
      const chunk = filteredList.slice(i, i + chunkSize);
      const average = chunk.reduce((sum, value) => sum + value, 0) / chunkSize;
      averagedArray.push(average);
    }
    
    return averagedArray;
  }
  
  const chunkSize = 1;
  
  list = removeLeadingMinusOnes(list);
  var notes = calculateAverages(list, chunkSize);
  orig = removeLeadingMinusOnes(orig);
  orig = calculateAverages(orig, chunkSize);
  function addScore(percent, score, combo) {
    if (percent <= 50) {
        score += 5 * (1+(0.3*combo));
    } else if (percent <= 60 && percent > 50) {
        score += 10 * (1+(0.4*combo));
    } else if (percent <= 70 && percent > 60) {
        score += 30 * (1+(0.5*combo));
    } else if (percent <= 80 && percent > 70) {
        score += 50 * (1+(0.5*combo));
    } else if (percent <= 90 && percent > 80) {
        score += 100 * (1+(0.5*combo));
    } else {
        score += 200 * (1+(0.5*combo));
    }
    return score;
  }
 let count = 0;
 let tick = 0;
  const matchingIndexes = notes.filter((item, index) => {
    console.log(index);
    for (let i = -2; i <= 2; i++) {
      if (index + i >= 0 && index + i < orig.length) {
        const diff = Math.abs(item - orig[index + i]);
        const doubleNote = item * 2, quadNote = item * 4;  
        const doubleOrig = orig[index + i] * 2, quadOrig = orig[index + i] * 4;
        // console.log(item + " : " + orig[index + i] + " ??? " + Math.abs(doubleNote - orig[index + i]) + " ?? " + Math.abs(doubleOrig - item))
        if (diff <= 15 || Math.abs(doubleNote - orig[index + i]) <= 15 || Math.abs(doubleOrig - item) <= 15 || Math.abs(quadNote - orig[index + i]) <= 15 || Math.abs(quadOrig - item) <= 15) {
          count++;
          combo++;
          if (count > index_count) {
            index_count = count;
            var percentage = count/notes.length*100;
            score = addScore(percentage, score, combo); 
          }
          return true; 
        }
        else {
          if (tick > 2) {
            combo = 0;
            tick = 0;
          }
          else {
            tick++;
          }
        }
      }
    }
    return false; 
  }).length;  


  const percent = matchingIndexes/notes.length*100;
  
  var result;

  if (percent <= 50) {
    result = '/D.png';
  }
  else if (percent <= 60 && percent > 50) {
    result = '/C.png';
  }
  else if (percent <= 70 && percent > 60) {
    result = '/B.png';
  }
  else if (percent <= 80 && percent > 70) {
    result = '/A.png';
  }
  else if (percent <= 90 && percent > 80) {
    result = '/S.png';
  }
  else {
    result = '/SS.png';
  }

  return (
    <div>
      <h2>Combo: {combo} </h2>
      <h2>Score: {score} </h2>
      <h2>Percent: {isNaN(percent) ? "0%" : percent.toString().substring(0,5) + "%"} </h2>
      {/* <h2>Rank: {result.substring(2,3) === 'S' ? result.substring(1,3) : result.substring(1,2)} </h2> */}
      {score > 0 && (
        <img src={result} alt={result.substring(1,2)}></img>
      )}
    </div>
  );
};

export default ResultScreen;