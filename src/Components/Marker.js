// import React from 'react';
// import ReactDOM from 'react-dom';

// export class Marker extends React.Component {
//   componentDidUpdate(prevProps) {
//     if ((this.props.map !== prevProps.map) ||
//       (this.props.position !== prevProps.position)) {
//         this.renderMarker();
//     }
//   }

//   handleEvent(evtName) {
//     return (e) => {
//       const evtName = `on${camelize(evt)}`
//       if (this.props[evtName]) {
//         this.props[evtName](this.props, this.marker, e);
//       }
//     }
//   }

//   renderMarker() {
//     let {
//       map, google, position, mapCenter
//     } = this.props;

//     let pos = position || mapCenter;
//     position = new google.maps.LatLng(pos.lat, pos.lng);

//     const pref = {
//       map: map,
//       position: position
//     };
//     this.marker = new google.maps.Marker(pref);
//     evtNames.forEach(e => {
//       this.marker.addListener(e, this.handleEvent(e));
//     })
//   }
  
//   render() {
//     return null;
//   }
// }

// export default Marker;