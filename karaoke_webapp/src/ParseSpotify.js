import data from './assets/lyrics2.txt';

let file;

const fetchFile = async () => {
    try {
      const response = await fetch(data);
      file = await response.text();
    } catch (error) {
      console.error('error ', error);
    }
  };

fetchFile();

console.log(file);

const lyrics2 = file.lines.map(line => ({
    time: line.timeTag.split(':')[0],
    words: line.words
  }));
  
export { lyrics2 }

