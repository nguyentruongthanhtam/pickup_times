import React, { Component } from 'react';
import './App.css';
import Fields from './Fields';
import Mapbox from './Map';
// CSV Parsing Library
import PapaParse from 'papaparse';

class App extends Component {
  constructor(props)
  {
    super(props)
    this.state = {
      result: [],
      dates: [],
      locations: []
    }
  }

  // When locations data parsing completed
  onLocationsLoaded = (result) => 
  {
    this.setState({
      locations: result.data,
    })
  }

  // When pickup_times data parsing completed
  onPickupTimeLoaded = (result) => 
  {
    // result holds data from CSV file
    // Get distinct dates from result 
    const a = result.data;
    const l = a.length;
    const dates_array =[];
    for(let i=0 ; i<l-1; i++)
    {
      let date = a[i].iso_8601_timestamp;
      // if dates_array not contain this date => insert it to dates_array
      if(!dates_array.includes(date.substring(0,10)))
      {
        dates_array.push(date.substring(0,10))
      }
    }

    // update dates object then feed to input fields
    this.setState({
      result: result.data,
      dates: dates_array
    })
  }

  // Get Date and Time from user's input
  onDateTimeChosen = (choice) => 
  {
    // get pickup and location data
    const pickup_data = this.state.result;
    const locations_data = this.state.locations;

    // Add pickup_time array to locations data so can feed to the map later
    let pickup_times_array = locations_data.map(l=>{
      return {
        ...l,
        pickup_time: []
      }
    })

    // Get pickup times from csv parsed data 
    for(let i=0 ; i<pickup_data.length-1 ; i++)
    {
      // Split timestamp field into date and hours
      let d = pickup_data[i].iso_8601_timestamp;
      const date = d.substring(0,10)
      const hours = d.substring(11,13)

      // location_id and pickup_time fields
      const location_id = pickup_data[i].location_id
      const pickup_time = pickup_data[i].pickup_time
      
      // If date and hours matched then add to pickup_times array
      if(date === choice.date && hours === choice.time)
      {
        pickup_times_array[location_id-1].pickup_time.push(pickup_time);
      }
    }

    // Update the locations data after added pickup_times array
    this.setState({locations: pickup_times_array})
  }

  // Load CSV data when the App start
  componentDidMount()
  {
    // CVS files import
    const CSV_pickup_times = require('./db/pickup_times.csv')
    const CSV_locations = require('./db/locations.csv')
    // Using PapaParse library to parse csv data 
    // then save it to result object

    // Pickup_time CSV
    const pickup_data = PapaParse.parse(CSV_pickup_times,
    {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.onPickupTimeLoaded,
    })
    // Locations CSV
    const locations_data = PapaParse.parse(CSV_locations,
    {
      header: true,
      download: true,
      complete: this.onLocationsLoaded,
      skipEmptyLines: true
    })
  }
  
  render() {
    let loading = this.state.isLoading
    let result = this.state.result
    let dates_array = this.state.dates
    let locations = this.state.locations
    return (
      <div className="App">

        {/* Get user's input Component */}
        <Fields 
          date_time={this.onDateTimeChosen}
          dates_array = {dates_array}
        ></Fields>

        {/* Map Component */}
        <Mapbox locations={locations}></Mapbox>
      </div>
    );
  }
}

export default App;
