import React, { Component } from 'react';
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import MapboxGL from 'mapbox-gl';
// Add your MAPBOX API KEY in order to get the map to work
const KEY = process.env.REACT_APP_MAP_KEY;

const Map = ReactMapboxGl({
  accessToken: KEY
});

// symbol layout and style of values on the Map
const symbolPaint: MapboxGL.SymbolPaint = {
  'text-color': 'rgb(183, 255, 16)'
};
const symbolLayout: MapboxGL.SymbolLayout = 
{
  "text-field": "{place}",
  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
  "text-offset": [0, 0.6],
  "text-anchor": "top"
}

export default class Mapbox extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      source: ''
    }
  }
  // Get Median Pickup Time from pickup_time array in props
  getAverageValue(array)
  {
    // Get the sum of pickup_time array
    const sum = array.reduce((acc,current)=>{
      return Number(acc) + Number(current)
    }, 0)
    return Math.round(sum / array.length); // Round number to integer
  }

  // Map props to geoJson format then feed to Map
  componentWillReceiveProps(props)
  {
    // Map pickup_time values to points follow
    // geojson standard of every point data.
    const mapped_source = props.locations.map(restaurant => {
      return {
        "type": "Feature",
        "properties": {
          "title": restaurant.location_id,
          "place": (restaurant.pickup_time && restaurant.pickup_time.length !== 0) ? this.getAverageValue(restaurant.pickup_time) : ''
        },
        "geometry": {
          "coordinates": [
            Number(restaurant.longitude),
            Number(restaurant.latitude)
          ],
          "type": "Point"
        }
      }
    })

    // Create source object with geojson format then add mapped points array above.
    let source = {}
    source = {
      type: 'FeatureCollection',
      features: mapped_source
    }
    this.setState({source: source})
  }
  
  render()
  {
    const source = this.state.source
    // render map when source is not empty
    if(source) 
    {
      return (
      <Map
        style="mapbox://styles/mapbox/dark-v9"
        containerStyle={{
          position: 'absolute',
          height: "100vh",
          width: "100vw"
        }}
        // center point is the 1st location. I manually added.
        center={[24.941583, 60.17087]}
      >
        {/* Show points on Map */}
        <GeoJSONLayer
          data={source}
          symbolPaint={symbolPaint}
          symbolLayout={symbolLayout}
          />
      </Map>
      )
    }
    // When map's source is empty
    else
     return <div>Map is Loading....</div>
  }
}