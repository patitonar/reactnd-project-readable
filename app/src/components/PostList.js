import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchCategories } from '../actions';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  render() {
    const { posts, categories } = this.props;
    return (
      <div>
        <Tabs>
          <Tab label="Home" />
          {categories && categories.length > 0 && categories.map((categories, i) => (<Tab label={categories.name} key={i} />))}
        </Tabs>
          <List>
            {posts 
            && posts.length > 0 
            && posts.map((post, i) => (
              <div>
                <ListItem 
                  key={i} disabled
                  primaryText={post.title}
                  secondaryText={post.author}
                />
                <Divider inset={true} />
              </div>
            ))}
          </List>
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
