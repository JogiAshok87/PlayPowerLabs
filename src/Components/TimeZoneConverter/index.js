import React, { Component } from 'react';
import moment from 'moment-timezone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TimeZoneDisplay from '../TimeZoneDisplay';


class TimeZoneConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZones: ['UTC', 'Asia/Kolkata'], // Default time zones
      currentTime: moment(),
    };
  }

  

  handleTimeZoneAddition = (timeZone) => {
    this.setState(prevState => ({
      timeZones: [...prevState.timeZones, timeZone]
    }));
  };

  handleTimeZoneDeletion = (index) => {
    this.setState(prevState => ({
      timeZones: prevState.timeZones.filter((_, i) => i !== index)
    }));
  };

  onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(this.state.timeZones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    this.setState({ timeZones: items });
  };

  render() {
    const { timeZones, currentTime } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {timeZones.map((zone, index) => (
                <Draggable key={zone} draggableId={zone + index} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {/* Render each time zone here */}
                      <TimeZoneDisplay
                        timeZone={zone}
                        currentTime={currentTime}
                        onDelete={() => this.handleTimeZoneDeletion(index)}
                      />
                      
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
export default TimeZoneConverter;
