import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import VoteScore from './VoteScore';
import { Edit, DeleteForever } from 'material-ui-icons';
import moment from 'moment';
import {
  getPost,
  fetchComments,
  deletePost,
  votePost,
  voteComment,
  deleteComment
} from '../actions';
import GenericList from './GenericList';
import { sortBy } from '../utils/sort';

class PostDetail extends Component {
  state = {
    fireRedirect: false
  };

  componentDidMount() {
    const { postId } = this.props.match.params;
    this.props.getPost(postId);
    this.props.fetchComments(postId);
  }

  handleDelete = post => {
    this.props.deletePost(post);
    this.setState({ fireRedirect: true });
  };

  handlePostVote = (post, option) => this.props.votePost(post.id, option);

  handleCommentVote = (comment, option) =>
    this.props.voteComment(comment.id, option);

  handleCommentDelete = comment => this.props.deleteComment(comment);

  render() {
    const { post, comments } = this.props;
    const { fireRedirect } = this.state;
    return (
      <div>
        {fireRedirect && <Redirect to={'/'} />}
        {post && (
          <div>
            <Card style={{ padding: 5, margin: 5 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 16,
                  paddingRight: 16
                }}
              >
                <VoteScore item={post} handleVote={this.handlePostVote} />
                <CardHeader
                  title={post.title}
                  subheader={`Sent ${moment(post.timestamp).format(
                    'Do MMMM YYYY, h:mm a'
                  )} by ${post.author}`}
                />
                <div
                  style={{
                    flex: '1 1 auto'
                  }}
                />
                <div>
                  <Edit />
                  <DeleteForever onClick={() => this.handleDelete(post)} />
                </div>
              </div>
              <CardContent>
                <Typography paragraph>{post.body}</Typography>
              </CardContent>
            </Card>
          </div>
        )}
        {post &&
          comments && (
            <div>
              <Card style={{ padding: 5, margin: 5 }}>
                <CardHeader title={`${post.numComments} comments`} />
                <GenericList
                  items={comments}
                  handleVote={this.handleCommentVote}
                  handleDelete={this.handleCommentDelete}
                />
              </Card>
            </div>
          )}
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  return {
    post: posts.filter(post => post.id === match.params.postId)[0],
    comments: sortBy(comments[match.params.postId])
  };
}

export default connect(mapStateToProps, {
  getPost,
  fetchComments,
  deletePost,
  votePost,
  voteComment,
  deleteComment
})(PostDetail);
