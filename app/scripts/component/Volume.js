import React, { Component } from 'react';

//TODO 使いづらい
class Volume extends Component {
  constructor() {
    super();
    this.youtubeUtil = window.youtubeUtil;
    this.shuvi = window.shuvi;
    this.dragFlg = false;
    this.pLeft = null;
    this.x = 50;
  }
  componentDidMount() {
    const pickerElement = document.getElementById('picker');
    console.log(pickerElement.getBoundingClientRect().left);
    pickerElement.addEventListener("mousedown" , () => { this.dragFlg = true; });
    pickerElement.addEventListener("mouseup" , () => { this.dragFlg = false; });
    pickerElement.addEventListener("mouseout" , () => { this.dragFlg = false; });
    pickerElement.addEventListener("mousemove" , (e) => {
      if(this.pLeft === null){ this.pLeft = pickerElement.getBoundingClientRect().left; }
      if(this.dragFlg){
        this.x += e.movementX;
        if(this.x > 90){ this.x = 90; } else if(this.x < -10) { this.x = -10; }
        pickerElement.style.left = this.x + 'px';
        this.shuvi.setVolume((this.x + 10)/100);
      }
    });
  }
  render() {
    return (
      <div id="picker"></div>
    );
  }
}

export default Volume;
