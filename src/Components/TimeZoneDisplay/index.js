import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import moment from 'moment';
import 'moment-timezone';
import './index.css'; 
import { HiXMark } from "react-icons/hi2";

function TimeZoneDisplay({ timeZone, currentTime, onDelete }) {
  const [selectedTime, setSelectedTime] = useState(moment().valueOf());
  const [istTime, setIstTime] = useState('');

  

  useEffect(() => {
    const localTime = moment.utc(currentTime).tz(timeZone);
    setSelectedTime(localTime.valueOf());

    const utcTime = moment.utc(currentTime);
    const istTime = utcTime.tz('Asia/Kolkata').format('hh:mm A');
    setIstTime(istTime);
  }, [currentTime, timeZone]);

  


  const handleTimeChange = (event, value) => {
    setSelectedTime(value);

    const utcTime = moment.utc(value);
    const istTime = utcTime.tz('Asia/Kolkata').format('hh:mm A');
    setIstTime(istTime);
  };

  
  const formatTime = (value) => moment.utc(value).tz(timeZone).format('hh:mm A');

  
// Generate marks for 3-hour intervals from 12 am to 11 pm
const marks = [];
for (let i = 0; i < 24; i += 3) {
  const time = moment().startOf('day').add(i, 'hours');
  marks.push({
    value: time.valueOf(),
    label: time.format('hh:mm A'), 
  });
}
  
  return (
    <div className="time-zone-display">
      {/* Time Zone Header */}
      <div className="header">
        <span className="time-zone-name">{timeZone}</span>
        <span className="time-display">{formatTime(selectedTime)}</span>
        <span className="gmt-offset">{`GMT ${moment().tz(timeZone).format('Z')}`}</span>
        <span className="current-date">{moment().format('ddd, MMM D')}</span>
        <button onClick={onDelete} className='removeBtn'><HiXMark /></button>
      </div>

      {/* Slider with Labels */}
      <Slider
        className='slider'
        value={selectedTime}
        onChange={handleTimeChange}
        min={moment().startOf('day').valueOf()}
        max={moment().endOf('day').valueOf()}
        step={10} 
        marks={marks}
        valueLabelDisplay="auto"
        valueLabelFormat={formatTime}
        
       
      />

      {/* IST Time Display */}
      <div className="ist-time">
        <p>IST: <span className='IST-Time'>{istTime}</span></p>
      </div>

      
    </div>
  );
}

export default TimeZoneDisplay;