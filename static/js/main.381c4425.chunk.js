(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,a){e.exports=a(37)},22:function(e,t,a){},24:function(e,t,a){},35:function(e,t,a){e.exports=a.p+"static/media/pickup_times.3f8db2e2.csv"},36:function(e,t,a){e.exports=a.p+"static/media/locations.f4d97783.csv"},37:function(e,t,a){"use strict";a.r(t);for(var n=a(0),o=a.n(n),i=a(13),r=a.n(i),c=(a(22),a(15)),s=a(2),l=a(3),u=a(5),d=a(4),m=a(6),p=(a(24),[]),h=0;h<24;h++){var v=h.toString(),f=(h+1).toString();23===h&&(f="00"),p.push(v+"-"+f)}var b=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).onCalculate=function(){a.props.date_time({date:a.state.chosen_date,time:a.state.chosen_time})},a.state={time_slots:p,chosen_time:"",chosen_date:""},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.state.time_slots,a=this.props.dates_array;return o.a.createElement("div",{className:"fields"},o.a.createElement("div",null,o.a.createElement("div",null,"Time"),o.a.createElement("select",{title:"Time",onChange:function(t){return e.setState({chosen_time:t.target.value})}},o.a.createElement("option",null,"-"),t?t.map(function(e,t){return o.a.createElement("option",{value:t,key:t}," ",e," ")}):"Loading..")),o.a.createElement("div",null,o.a.createElement("div",null," Date "),o.a.createElement("select",{title:"Date",onChange:function(t){return e.setState({chosen_date:t.target.value})},placeholder:"date"},o.a.createElement("option",null,"-"),a?a.map(function(e,t){return o.a.createElement("option",{value:e,key:t}," ",e," ")}):"loading..")),o.a.createElement("button",{onClick:function(){return e.onCalculate()}},"Calculate"))}}]),t}(n.Component),g=a(11),y=(a(1),Object(g.b)({accessToken:"pk.eyJ1Ijoibmd1eWVudHJ1b25ndGhhbmh0YW0iLCJhIjoiY2pyNzBsdHI5MXZidTQycnA2dDl6YzZzciJ9.cEEDnLd1EyJOubXvxyrntA"})),k={"text-color":"rgb(183, 255, 16)"},E={"text-field":"{place}","text-font":["Open Sans Semibold","Arial Unicode MS Bold"],"text-offset":[0,.6],"text-anchor":"top"},_=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={source:""},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"getAverageValue",value:function(e){var t=e.reduce(function(e,t){return Number(e)+Number(t)},0);return Math.round(t/e.length)}},{key:"componentWillReceiveProps",value:function(e){var t,a=this;t={type:"FeatureCollection",features:e.locations.map(function(e){return{type:"Feature",properties:{title:e.location_id,place:e.pickup_time&&0!==e.pickup_time.length?a.getAverageValue(e.pickup_time):""},geometry:{coordinates:[Number(e.longitude),Number(e.latitude)],type:"Point"}}})},this.setState({source:t})}},{key:"render",value:function(){var e=this.state.source;return e?o.a.createElement(y,{style:"mapbox://styles/mapbox/dark-v9",containerStyle:{position:"absolute",height:"100vh",width:"100vw"},center:[24.941583,60.17087]},o.a.createElement(g.a,{data:e,symbolPaint:k,symbolLayout:E})):o.a.createElement("div",null,"Map is Loading....")}}]),t}(n.Component),j=a(10),O=a.n(j),w=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).onLocationsLoaded=function(e){a.setState({locations:e.data})},a.onPickupTimeLoaded=function(e){for(var t=e.data,n=t.length,o=[],i=0;i<n-1;i++){var r=t[i].iso_8601_timestamp;o.includes(r.substring(0,10))||o.push(r.substring(0,10))}a.setState({result:e.data,dates:o})},a.onDateTimeChosen=function(e){for(var t=a.state.result,n=a.state.locations.map(function(e){return Object(c.a)({},e,{pickup_time:[]})}),o=0;o<t.length-1;o++){var i=t[o].iso_8601_timestamp,r=i.substring(0,10),s=i.substring(11,13),l=t[o].location_id,u=t[o].pickup_time;r===e.date&&s===e.time&&n[l-1].pickup_time.push(u)}a.setState({locations:n})},a.state={result:[],dates:[],locations:[]},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=a(35),t=a(36);O.a.parse(e,{header:!0,download:!0,skipEmptyLines:!0,complete:this.onPickupTimeLoaded}),O.a.parse(t,{header:!0,download:!0,complete:this.onLocationsLoaded,skipEmptyLines:!0})}},{key:"render",value:function(){this.state.isLoading,this.state.result;var e=this.state.dates,t=this.state.locations;return o.a.createElement("div",{className:"App"},o.a.createElement(b,{date_time:this.onDateTimeChosen,dates_array:e}),o.a.createElement(_,{locations:t}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[16,2,1]]]);
//# sourceMappingURL=main.381c4425.chunk.js.map