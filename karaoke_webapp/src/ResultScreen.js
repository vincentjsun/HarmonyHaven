import React from 'react';

const ResultScreen = ({ user, orig, perc }) => {
  const matchingIndexes = user.filter((item, index) => {
    for (let i = -3; i <= 3; i++) {
      if (index + i >= 0 && index + i < orig.length) {
        const diff = Math.abs(item - orig[index + i]);
        if (diff <= 100) {
          return true; 
        }
      }
    }
    return false; 
  }).length;

  console.log(matchingIndexes);

  perc.push(matchingIndexes/user.length*100);
  const percent = perc[0];
  console.log(percent);
  
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
      <h2>Rank: {result.substring(2,3) === 'S' ? result.substring(1,3) : result.substring(1,2)} </h2>
      <img src={result} alt={result.substring(1,2)}></img>
      <p>Number of Matching Frequencies: {matchingIndexes}</p>

    </div>
  );
};

export default ResultScreen;