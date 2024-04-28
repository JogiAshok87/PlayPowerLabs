import React, { useState } from "react";

import { TextField,MenuItem } from "@mui/material"
import dayjs from "dayjs";
import {  DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider, } from "@mui/x-date-pickers";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { FaCalendarAlt } from "react-icons/fa";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { FiLink } from "react-icons/fi";
import { FiSun } from "react-icons/fi";
import {FiMoon} from "react-icons/fi";
import './index.css'

const currentDate = dayjs().format('YYYY-MM-DD');


const Header = ({onAddTimeZone,isDarkMode, toggleDarkMode,reverseTimeZones }) =>{
    const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeZone, setSelectedTimeZone] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTimeZoneSelect = (event) => {
    setSelectedTimeZone(event.target.value);
  };

  const handleAddTimeZone = () => {
    onAddTimeZone(selectedTimeZone);
    setSelectedTimeZone('');
  };

  //  timezones
  const timeZones = [
    { label: 'Eastern Time', value: 'America/New_York' },
    { label: 'Pacific Standard Time', value: 'America/Los_Angeles' },

  ];

  // Filter timezones based on search query
  const filteredTimeZones = timeZones.filter(timeZone =>
    timeZone.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
    
    
    return(
        <div className="header-container">
            
            
            <TextField id="outlined-basic"
                label="Search and add timezone"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <TextField select
                label="Select Timezone"
                value={selectedTimeZone}
                onChange={handleTimeZoneSelect}
                variant="outlined"
                size="small"
                
            >
                {filteredTimeZones.map(timeZone => (
                <MenuItem key={timeZone.value} value={timeZone.value}>
                    {timeZone.label}
                </MenuItem>
                ))}
            </TextField>
            <button onClick={handleAddTimeZone}>Add</button>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem >
                <DesktopDatePicker defaultValue={dayjs(currentDate)} size="small" sx={{ transform: "scale(0.8)" }}/>
            </DemoItem>
            </LocalizationProvider>
            <div className="icons">
                <div><FaCalendarAlt size={25}/></div>
                <div onClick={reverseTimeZones}><HiMiniArrowsUpDown size={25}/></div>
                <div><FiLink size={25}/></div>
                <div onClick={toggleDarkMode}>
                       {isDarkMode ? <FiSun size={25} /> : <FiMoon size={25} />}
                </div>
            
            </div>
            
    
              
        </div>
    )

}

export default Header