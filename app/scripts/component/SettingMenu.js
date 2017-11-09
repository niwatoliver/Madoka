import React, { Component } from 'react';

class Setting extends Component {
  constructor() {
    super();
    this.state = { quality: 'default' };
    this.shuvi = null;
  }

  componentDidMount() {
    document.getElementById('q-1080').addEventListener('click', () =>{ this.changeQuality('hd1080'); });
    document.getElementById('q-720').addEventListener('click', () =>{ this.changeQuality('hd720'); });
    document.getElementById('q-large').addEventListener('click', () =>{ this.changeQuality('large'); });
    document.getElementById('q-medium').addEventListener('click', () =>{ this.changeQuality('medium'); });
    document.getElementById('q-small').addEventListener('click', () =>{ this.changeQuality('small'); });
    document.getElementById('q-auto').addEventListener('click', () =>{ this.changeQuality('default'); });
  }

  changeQuality(quality) {
    if(!this.shuvi && window.shuvi){ this.shuvi = window.shuvi; }
    if(this.shuvi){
      this.setState({ quality: quality });
      this.shuvi.player.setPlaybackQuality(quality);
    }
  }

  render() {
    const selected = <span className="quality-selected" />;
    const quality = this.state.quality;
    return (
      [
        <div key={0} id="setting-menu-title"><p>画質</p></div>,
        <div key={1} className="quality" id="q-1080">{ quality === 'hd1080' ? selected : null }<p>hd1080</p></div>,
        <div key={2} className="quality" id="q-720">{ quality === 'hd720' ? selected : null }<p>hd720</p></div>,
        <div key={3} className="quality" id="q-large">{ quality === 'large' ? selected : null }<p>large</p></div>,
        <div key={4} className="quality" id="q-medium">{ quality === 'medium' ? selected : null }<p>medium</p></div>,
        <div key={5} className="quality" id="q-small">{ quality === 'small' ? selected : null }<p>small</p></div>,
        <div key={6} className="quality" id="q-auto">{ quality === 'default' ? selected : null }<p id="auto">自動</p></div>
      ]
    );
  }
}

export default Setting;