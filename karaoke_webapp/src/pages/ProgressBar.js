import { useState, useEffect } from "react";

const ProgressBar = ({ duration }) => {
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      let startTime = Date.now();
      const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.min((elapsedTime / duration) * 100, 100);
        setProgress(newProgress);
  
        if (newProgress === 100) {
          clearInterval(interval);
        }
      }, 100);
  
      return () => {
        clearInterval(interval);
      };
    }, [duration]);
  
    return (
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    );
  };
  
  export default ProgressBar;