import React, { Component } from 'react';

// Create time slots array for time select field
let time_slots = [];
for(let i=0 ; i<24; i++)
{
  const from = i.toString()
  let to = (i+1).toString()
  if (i === 23)
  {
    to = '00'
  }
  time_slots.push(from +'-'+ to);
}

export default class Fields extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      time_slots : time_slots,
      chosen_time: '',
      chosen_date: ''
    }
  }
  
  // Send choices to parent component when button clicked
  onCalculate = () => {
    this.props.date_time({
      date: this.state.chosen_date,
      time: this.state.chosen_time
    })
  }
  render()
  {
    let time_slots = this.state.time_slots;
    // array of dates was passed from parent component
    let dates_array = this.props.dates_array;
    return (
      <div className="fields">
        <div>
          {/* Select Time field */}
          <div>Time</div>
          <select title="Time" 
                  onChange={(e)=>this.setState({chosen_time: e.target.value })}     
          >
            {/* Default value */}
            <option>-</option>
            {
              // Map time slots to select field
              time_slots ? time_slots.map( (time,index) =>
                <option value={index}
                        key={index}
                > {time} </option>
              ) : 'Loading..'
            }
          </select>
        </div>
        {/* Select Date field */}
        <div>
          <div> Date </div>
          <select title="Date" 
                  onChange={(e)=>this.setState({chosen_date: e.target.value })}
                  placeholder="date"
          >
            {/* Default value */}
            <option>-</option>
            {
              // Map dates from props to select field
              dates_array ? dates_array.map( (date,index) =>
                <option value={date}
                        key={index}
                > {date} </option>
              ) : 'loading..'
            }
          </select>
        </div>
        {/* Calculate Button */}
        <button onClick={()=>this.onCalculate()}>Calculate</button>
      </div>
    )
  }
}