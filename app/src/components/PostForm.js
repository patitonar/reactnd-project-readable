import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import { addPost, updatePost } from '../actions';
import Card from 'material-ui/Card';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { baseCategory } from '../utils/config';
import { Redirect } from 'react-router-dom';

class PostForm extends Component {
  state = {
    author: this.props.post ? this.props.post.author : '',
    title: this.props.post ? this.props.post.title : '',
    body: this.props.post ? this.props.post.body : '',
    category: this.props.post ? this.props.post.category : 'react',
    finished: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  redirect = () => this.setState({ finished: true });

  handleSubmit = event => {
    event.preventDefault();

    const { post, addPost, updatePost } = this.props;

    if (post) {
      const updatedPost = {
        ...post,
        timestamp: Date.now(),
        author: this.state.author,
        body: this.state.body,
        title: this.state.title,
        category: this.state.category
      };
      updatePost(updatedPost);
    } else {
      const newPost = {
        id: v4(),
        timestamp: Date.now(),
        author: this.state.author,
        body: this.state.body,
        title: this.state.title,
        category: this.state.category
      };
      addPost(newPost);
    }
    this.redirect();
  };

  render() {
    const { categories } = this.props;
    const { finished } = this.state;

    if (finished) {
      return <Redirect to={'/'} />;
    }

    return (
      <Card style={{ padding: 5, margin: 5 }}>
        <div
          style={{
            paddingLeft: 16
          }}
        >
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 600
            }}
            onSubmit={event => this.handleSubmit(event)}
            autoComplete="off"
          >
            <TextField
              required
              id="title"
              label="Title"
              fullWidth
              value={this.state.title}
              onChange={this.handleChange('title')}
              style={{
                paddingTop: 10,
                paddingBottom: 20
              }}
            />
            <TextField
              required
              id="body"
              label="Body"
              fullWidth
              multiline
              rows="4"
              value={this.state.body}
              onChange={this.handleChange('body')}
            />
            <TextField
              required
              id="author"
              label="Author"
              fullWidth
              value={this.state.author}
              onChange={this.handleChange('author')}
              style={{
                paddingTop: 10,
                paddingBottom: 20
              }}
            />
            <FormControl>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                value={this.state.category}
                onChange={this.handleChange('category')}
                input={<Input id="category" />}
                style={{
                  marginBottom: 20
                }}
              >
                {categories &&
                  categories.length > 0 &&
                  categories.map((category, i) => (
                    <MenuItem key={i} value={category.path}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button
              raised
              color="primary"
              style={{
                marginBottom: 20
              }}
              type="submit"
            >
              Save
            </Button>
            <Button
              style={{
                marginBottom: 20
              }}
              onClick={this.redirect}
            >
              Cancel
            </Button>
          </form>
        </div>
      </Card>
    );
  }
}

function mapStateToProps({ posts, categories }, { match }) {
  return {
    post: posts.filter(post => post.id === match.params.postId)[0],
    categories:
      (categories && categories.length) > 0
        ? categories.filter(category => category.path !== baseCategory.path)
        : categories
  };
}

export default connect(mapStateToProps, { addPost, updatePost })(PostForm);
