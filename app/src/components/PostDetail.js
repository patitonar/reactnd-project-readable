import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import VoteScore from './VoteScore';
import { Edit, DeleteForever } from 'material-ui-icons';
import moment from 'moment';
import { getPost, fetchComments } from '../actions';

class PostDetail extends Component {
  componentDidMount() {
    const { postId } = this.props.match.params;

    this.props.getPost(postId);
    this.props.fetchComments(postId);
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        {post && (
          <div>
            <Card style={{ padding: 5, margin: 5 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <VoteScore item={post} handleVote={() => {}} />
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
                  <DeleteForever />
                </div>
              </div>
              <CardContent>
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add
                  saffron and set aside for 10 minutes.
                </Typography>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ posts }, { match }) {
  return {
    post: posts.filter(post => post.id === match.params.postId)[0]
  };
}

export default connect(mapStateToProps, { getPost, fetchComments })(PostDetail);
