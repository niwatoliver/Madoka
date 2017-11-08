import React from 'react';
import ReactDOM from 'react-dom';
import CommentWindow from './component/CommentWindow';
import Volume from './component/Volume';
import VideoTime from './component/VideoTime';
import Setting from './component/SettingMenu';

ReactDOM.render(<CommentWindow />, document.getElementById('comment-window'));
ReactDOM.render(<Volume />, document.getElementById('volume'));
ReactDOM.render(<VideoTime />, document.getElementById('now-time'));
ReactDOM.render(<Setting />, document.getElementById('setting-menu'));