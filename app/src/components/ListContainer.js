import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { fetchPosts, deletePost, votePost } from '../actions/postsActions';
import { fetchCategories } from '../actions/categoriesActions';
import { orderBy } from '../actions/orderActions';
import PostList from './PostList';
import CategoryBar from './CategoryBar';
import { baseCategory } from '../utils/config';
import { sortBy } from '../utils/sort';
import PropTypes from 'prop-types';

class ListContainer extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    order: PropTypes.string,
    fetchPosts: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    orderBy: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  handleOrderChange = event => this.props.orderBy(event.target.value);

  handleDelete = post => this.props.deletePost(post);

  handlePostVote = (post, option) => this.props.votePost(post.id, option);

  render() {
    const { posts, categories, order } = this.props;
    return (
      <div>
        <CategoryBar
          order={order}
          categories={categories}
          handleOrderChange={this.handleOrderChange}
        />
        {categories &&
          categories.length > 0 &&
          categories.map((category, i) => (
            <Route
              exact
              path={`/${category.path}`}
              key={i}
              render={() => (
                <PostList
                  items={
                    category.path === baseCategory.path
                      ? posts
                      : posts.filter(post => post.category === category.path)
                  }
                  handleVote={this.handlePostVote}
                  handleDelete={this.handleDelete}
                />
              )}
            />
          ))}
      </div>
    );
  }
}

function mapStateToProps({ posts, categories, order }) {
  return {
    posts: sortBy(posts, order),
    categories,
    order
  };
}

export default connect(mapStateToProps, {
  fetchPosts,
  fetchCategories,
  orderBy,
  deletePost,
  votePost
})(ListContainer);
