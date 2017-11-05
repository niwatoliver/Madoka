import React from 'react';
import ReactDOM from 'react-dom';
import CommentWindow from './component/CommentWindow';
import Volume from './component/Volume';

ReactDOM.render(<CommentWindow />, document.getElementById('comment-window'));
ReactDOM.render(<Volume />, document.getElementById('volume'));