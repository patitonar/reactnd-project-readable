import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {
  fetchPosts,
  fetchCategories,
  orderBy,
  deletePost,
  votePost
} from '../actions';
import GenericList from './GenericList';
import CategoryBar from './CategoryBar';
import { baseCategory } from '../utils/config';
import { sortBy } from '../utils/sort';
import { AddCircle } from 'material-ui-icons';

class ListContainer extends Component {
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
                <GenericList
                  items={
                    category.path === baseCategory.path ? (
                      posts
                    ) : (
                      posts.filter(post => post.category === category.path)
                    )
                  }
                  handleVote={this.handlePostVote}
                  handleDelete={this.handleDelete}
                />
              )}
            />
          ))}
        <AddCircle
          style={{
            position: 'fixed',
            right: 25,
            bottom: 25,
            width: 50,
            height: 50,
            fill: '#3f51b5'
          }}
        />
      </div>
    );
  }
}

function mapStateToProps({ posts, categories, order }) {
  return {
    posts: sortBy(order, posts),
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
