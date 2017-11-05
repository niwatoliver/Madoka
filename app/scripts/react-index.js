import React from 'react';
import ReactDOM from 'react-dom';
import CommentWindow from './component/CommentWindow';
import Volume from './component/Volume';
import Seek from './component/Seek';

ReactDOM.render(<CommentWindow />, document.getElementById('comment-window'));
ReactDOM.render(<Volume />, document.getElementById('volume'));
ReactDOM.render(<Seek />, document.getElementById('seek'));