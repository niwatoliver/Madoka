import React, { Component } from 'react';

class VideoTime extends Component {
  constructor() {
    super();
    this.youtubeUtil = window.youtubeUtil;
    this.state = { time: '00:00:00' };
  }
  render() {
    return (
      <p>経過時間：{ this.state.time }</p>
    );
  }
}

export default VideoTime;
