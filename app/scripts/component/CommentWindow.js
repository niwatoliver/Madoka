import React, { Component } from 'react';
import YoutubeComment from './youtube/YoutubeComment';

class CommentWindow extends Component {
  constructor() {
    super();
    this.youtubeComment = new YoutubeComment(process.env.YOUTUBE_API_KRY);
    this.state = { comments: [] };
  }

  componentDidMount() {
    const VIDEO_ID = 'ttW_-8pVg_o';
    this.youtubeComment.connectChat(VIDEO_ID, (chatId) => {
      this.youtubeComment.connectComment(chatId, (comments) => {
        Array.prototype.push.apply(this.state.comments, comments);
        this.setState({ comments: this.state.comments });
      });
    });
    document.getElementById('play').addEventListener('click', () =>{
      this.setState({ comments: [] });
      this.commentChange();
    }, false);
  }

  commentChange() {
    console.log(this.youtubeComment);
    const video_id = document.getElementById('search').value;
    this.youtubeComment.stopComment();
    this.youtubeComment.connectChat(video_id, (chatId) => {
      this.youtubeComment.connectComment(chatId, (comments) => {
        Array.prototype.push.apply(this.state.comments, comments);
        console.log('state change!');
        console.log(this.state.comments);
        this.setState({ comments: this.state.comments });
      });
    });
  }

  render() {
    return (
      <div className="comment">
        {this.state.comments.map((c,k) => <p key={k}>{c}</p>)}
      </div>
    );
  }
}

export default CommentWindow;