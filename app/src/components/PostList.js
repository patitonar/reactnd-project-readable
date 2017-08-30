import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="App-intro">
        {posts && posts.length > 0 && posts.map((post, i) => (<p key={i}>{post.title}</p>))}
      </div>
    );
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts
  }
}

export default connect(
  mapStateToProps,
  { fetchPosts }
)(PostList);
