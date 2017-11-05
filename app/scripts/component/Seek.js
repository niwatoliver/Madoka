import React, { Component } from 'react';

class Seek extends Component {
  render() {
    return ([
      <div id="current-time">1:00</div>,
      <div id="seek-bar">
        <div id="seek-toggle"/>
      </div>,
      <div id="video-time">10:00:00</div>
    ]);
  }
}

export default Seek;