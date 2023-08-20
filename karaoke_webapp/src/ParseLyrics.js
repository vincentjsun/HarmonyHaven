export const getLyrics = (data) => {
  const lines = data.trim().split('\n\n');
  const lyrics = lines.slice(1).map((line) => {
    const [timestamp, ...textLines] = line.split('\n');
    const [start, end] = timestamp.split(' --> ').map(getTime);
    const text = textLines.join(' ');
    return { line: text, start, end };
  });
  return lyrics;
};

const getTime = (timestamp) => {
  const sec = timestamp.split(':');
  const num = sec[1].split('.');
  return parseFloat(num[0]) + parseFloat((num[1] / 1000));
};