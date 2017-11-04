import React, { Component } from 'react';
import YoutubeComment from '../../youtube/YoutubeComment';
import { CSSTransition }  from 'react-transition-group';

class CommentWindow extends Component {
  constructor() {
    super();
    this.youtubeComment = new YoutubeComment(process.env.YOUTUBE_API_KRY);
    this.state = { comments: [], animation: false };
  }

  componentDidMount() {
    const VIDEO_ID = 'jqaycEsE0p8';
    document.getElementById('play').addEventListener('click', () =>{
      this.setState({ comments: [], animation: false });
      this.commentChange();
    }, false);
    this.connectComment(VIDEO_ID);
  }

  componentDidUpdate(){
    console.log('did update!');
    const cw = document.getElementsByClassName('comment-wrap')[0];
    cw.scrollTop = cw.scrollHeight;
  }

  commentChange() {
    const video_id = document.getElementById('search').value;
    this.youtubeComment.stopComment();
    this.connectComment(video_id);
  }

  connectComment(video_id) {
    this.youtubeComment.connectChat(video_id, (chatId) => {
      this.youtubeComment.connectComment(chatId, (comments) => {
        Array.prototype.push.apply(this.state.comments, comments);
        this.setState({
          comments: this.state.comments.slice(this.state.comments.length - 200, this.state.comments.length),
          animation: !this.state.animation
        });
      });
    });
  }

  render() {
    return (
      <div>
        <p className="comment-header">コメント</p>
        <div className="comment-wrap">
          <CSSTransition in={this.state.animation} classNames="fade" timeout={1000}>
            <div>{this.state.comments.map((c,k) => <p className="comment" key={k}>{c}</p>)}</div>
          </CSSTransition>
        </div>
      </div>
    );
  }
}

export default CommentWindow;