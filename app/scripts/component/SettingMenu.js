import React, { Component } from 'react';

class Setting extends Component {
  constructor() {
    super();
    this.state = { quality: 'auto' };
  }

  render() {
    return (
      [
        <div key={0} id="setting-menu-title"><p>画質</p></div>,
        <div key={1} className="quality"><span className="quality-selected" /><p>720p60</p></div>,
        <div key={2} className="quality"><p>480p</p></div>,
        <div key={3} className="quality"><p>360p</p></div>,
        <div key={4} className="quality"><span className="quality-selected" /><p>260p</p></div>,
        <div key={5} className="quality"><p>114p</p></div>,
        <div key={6} className="quality"><p id="auto">自動</p></div>
      ]
    );
  }
}

export default Setting;