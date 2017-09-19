import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import {
  fetchPosts,
  fetchCategories,
  orderByVoteScore,
  orderByTimeStamp
} from '../actions';
import PostList from './PostList';
import { baseCategory } from '../utils/config';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import { sortByVoteScore, sortByTimeStamp } from '../utils/sort';
import { VOTE_ORDER } from '../utils/config';

class ListContainer extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
    this.props.orderByVoteScore();
  }

  render() {
    const { posts, categories } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            {categories &&
              categories.length > 0 &&
              categories.map((category, i) => (
                <Link
                  to={category.path}
                  key={i}
                  style={{ textDecoration: 'none' }}
                >
                  <Button color="contrast">{category.name}</Button>
                </Link>
              ))}
          </Toolbar>
        </AppBar>
        {categories &&
          categories.length > 0 &&
          categories.map((category, i) => (
            <Route
              exact
              path={`/${category.path}`}
              key={i}
              render={() => (
                <PostList
                  posts={
                    category.path === baseCategory.path ? (
                      posts
                    ) : (
                      posts.filter(post => post.category === category.path)
                    )
                  }
                />
              )}
            />
          ))}
      </div>
    );
  }
}

function mapStateToProps({ posts, categories, order }) {
  console.log('order', order);
  return {
    posts:
      order === VOTE_ORDER ? sortByVoteScore(posts) : sortByTimeStamp(posts),
    categories,
    order
  };
}

export default connect(mapStateToProps, {
  fetchPosts,
  fetchCategories,
  orderByVoteScore,
  orderByTimeStamp
})(ListContainer);
