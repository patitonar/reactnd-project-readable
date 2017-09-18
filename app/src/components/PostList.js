import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';

const PostList = ({ posts }) => {
  return (
    <List>
      {posts &&
        posts.length > 0 &&
        posts.map((post, i) => (
          <div key={i}>
            <ListItem divider>
              <ListItemText primary={post.title} secondary={post.author} />
            </ListItem>
          </div>
        ))}
    </List>
  );
};

export default PostList;
