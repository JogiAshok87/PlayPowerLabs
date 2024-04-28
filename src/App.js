import React, { useState } from 'react';
import Header from './Components/Header'
import TimeZoneConverter from './Components/TimeZoneConverter';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [timeZones, setTimeZones] = useState(['UTC', 'Asia/Kolkata']);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleAddTimeZone = (timeZone) => {
    setTimeZones((prevTimeZones) => {
      if (!prevTimeZones.includes(timeZone)) {
        return [...prevTimeZones, timeZone];
      } else {
        console.log("Timezone already exists:", timeZone);
        return prevTimeZones; 
      }
    });
    
  };

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
      <h1 style={{textAlign:"center"}}>Time Conversion</h1>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} onAddTimeZone={handleAddTimeZone}/>
      <TimeZoneConverter timeZones={timeZones}/>
    </div>
  );
}

export default App;
