import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchCategories } from '../actions';

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  render() {
    const { posts, categories } = this.props;
    return (
      <div>
        <div>
          {categories && categories.length > 0 && categories.map((categories, i) => (<p key={i}>{categories.name}</p>))}
        </div>
        <div>
          {posts && posts.length > 0 && posts.map((post, i) => (<p key={i}>{post.title}</p>))}
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ posts, categories }) {
  return {
    posts,
    categories
  }
}

export default connect(
  mapStateToProps,
  { fetchPosts, fetchCategories }
)(PostList);
