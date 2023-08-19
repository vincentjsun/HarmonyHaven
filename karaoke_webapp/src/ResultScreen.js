import React from 'react';

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
  
  const chunkSize = 10;
  
  list = removeLeadingMinusOnes(list);
  var notes = calculateAverages(list, chunkSize);
  orig = removeLeadingMinusOnes(orig);
  orig = calculateAverages(orig, chunkSize);
  //console.log(notes);
  //console.log(orig);
  
  const matchingIndexes = notes.filter((item, index) => {
    for (let i = -2; i <= 2; i++) {
      if (index + i >= 0 && index + i < orig.length) {
        const diff = Math.abs(item - orig[index + i]);
        const doubleNote = item * 2, quadNote = item * 4;  
        const doubleOrig = orig[index + i] * 2, quadOrig = orig[index + i] * 4;
        // console.log(item + " : " + orig[index + i] + " ??? " + Math.abs(doubleNote - orig[index + i]) + " ?? " + Math.abs(doubleOrig - item))
        if (diff <= 50 || Math.abs(doubleNote - orig[index + i]) <= 50 || Math.abs(doubleOrig - item) <= 50 || Math.abs(quadNote - orig[index + i]) <= 50 || Math.abs(quadOrig - item) <= 50) {
          return true; 
        }
      }
    }
    return false; 
  }).length;  


  // perc.push(matchingIndexes/notes.length*100);
  // perc.push(matchingIndexes);
  const percent = matchingIndexes/notes.length*100;
  //console.log(percent);
  
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