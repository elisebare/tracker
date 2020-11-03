import React, { Component } from "react";
import { render } from "react-dom";
import DayLabel from "./dayLabel.jsx"
import Week from "./week.jsx"

class Month extends Component {

  constructor (props) {
    super(props)
    this.state = {
      daysStorage: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
      monthsStorage: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], 
    }
  }

  render() {

    //create array of dayLabel components for each day of week
    const dayLabels = this.state.daysStorage.map((el, i) => {
      return (
        <DayLabel dayOfWeek = {el} key={`day:${el}month:${this.props.month}`}/>
      )
    });

  
    //create 5 weeks -- each week will contain the start date, a date object representing the sunday at the start of that week

    const firstSunday = new Date(this.props.firstSundayYear, this.props.firstSundayMonth, this.props.firstSundayDate)
  
    const weeks = [];

    for (let i = 0; i < 5; i++){
      weeks.push(
        <Week 
          key={`dd:${firstSunday.getDate()}mm:${firstSunday.getMonth()}`} 
          firstSundayDate = {firstSunday.getDate()} 
          month = {firstSunday.getMonth()} 
          week={i} 
          year={firstSunday.getFullYear()}
          setPeriodDates = {this.props.setPeriodDates}
          period = {this.props.period}
          startDate = {this.props.startDate}
          endDate = {this.props.endDate}
          stageForUpdateOrDelete = {this.props.stageForUpdateOrDelete}
        />
      );
      firstSunday.setDate(firstSunday.getDate() + 7);
    }

    //if a period is staged for update or delete, we should display delete period button, otherwise, disaply add period button
    const buttonDisplay = [];
    if (this.props.storedStart !== '') {
      buttonDisplay.push(
        <button 
          key = "deletePeriod"
          className ="secondaryButton" 
          onClick = {this.props.deletePeriod}
        >
          Delete this period
        </button>
      )
    } else {
      buttonDisplay.push(
        <button
          key = "addPeriod" 
          className ="secondaryButton" 
          onClick = {this.props.newPeriod}
        >
          Save these period dates
        </button>
      );
    };
    
    return (
      <>
        <div className ="calendarHeading">
          <h2>Calendar for {this.state.monthsStorage[this.props.month]} {this.props.year}</h2>
        </div>
        <br></br>
        <div className="calendar">
          <div className="calendarRow daysRow">
            {dayLabels}
          </div>
          {weeks}
        </div>
        <br></br>
        
        <div className = "calendarHeading">
          {buttonDisplay}
          <br></br>
          <div className="monthToggle">
            <button onClick = {this.props.subtractMonth} className="primaryButton">Previous Month</button>
            <button onClick = {this.props.addMonth} className="primaryButton">Next Month</button>
          </div>
        </div>
        
        
      </>
    );
  }
}
export default Month; 