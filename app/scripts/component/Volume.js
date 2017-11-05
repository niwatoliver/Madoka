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
        this.setVolume(this.x, pickerElement);
      }
    });
    document.getElementById('volume-zero').addEventListener("click" , () => { this.setVolume(0, pickerElement); });
    document.getElementById('volume-max').addEventListener("click" , () => { this.setVolume(90, pickerElement); });
  }

  setVolume(x, pickerElement) {
    if(x > 90){ x = 90; } else if(x < -10) { x = -10; }
    this.shuvi.setVolume(0);
    this.x = x;
    pickerElement.style.left = this.x + 'px';
    this.shuvi.setVolume((this.x + 10)/100);
  }

  render() {
    return (
      <div id="picker"/>
    );
  }
}

export default Volume;
