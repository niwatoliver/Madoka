import React, { Component } from 'react';

//TODO 過去に遡れないライブの場合の時間表示
class VideoTime extends Component {
  constructor() {
    super();
    this.shuvi = null;
    this.state = { time: '00:00:00' };
  }
  componentDidMount() {
    setInterval(() =>  {
      if(!this.shuvi && window.shuvi){ this.shuvi = window.shuvi; }
      if(this.shuvi && this.shuvi.current){
        try {
          this.setState({ time: VideoTime.computeDuration(this.shuvi.current()) });
        } catch(e){ console.log('get time error'); }
      }
    }, 1000);
  }

  /**
   * ミリ秒を時分秒へ変換
   * ms ミリ秒
   */
  static computeDuration(ms){
    const h = String(Math.floor(ms / 3600) + 100).substring(1);
    const m = String(Math.floor((ms - h * 3600)/60)+ 100).substring(1);
    const s = String(Math.round((ms - h * 3600 - m * 60))+ 100).substring(1);
    return h+':'+m+':'+s;
  }
  render() {
    return (
      <p>経過時間：{ this.state.time }</p>
    );
  }
}

export default VideoTime;
