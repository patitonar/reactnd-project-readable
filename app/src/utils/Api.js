const url = `http://localhost:5001`;

const headers = {
  'Authorization': 'auth'
};

// Get Methods
export const getCategories = () =>
  fetch(`${url}/categories`, { headers })
    .then(res => res.json());

export const getCategoryPosts = (category) =>
  fetch(`${url}/${category}/posts`, { headers })
    .then(res => res.json());

export const getPosts = () =>
  fetch(`${url}/posts`, { headers })
    .then(res => res.json());

export const getPost = (id) =>
  fetch(`${url}/posts/${id}`, { headers })
    .then(res => res.json());

export const getComment = (id) =>
  fetch(`${url}/comments/${id}`, { headers })
    .then(res => res.json());

export const getPostComments = (id) =>
  fetch(`${url}/posts/${id}/comments`, { headers })
    .then(res => res.json());

// Post Methods
export const addPost = (post) =>
  fetch(`${url}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ post })
  }).then(res => res.json());

export const votePost = (id, option) =>
  fetch(`${url}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json());

export const addComment = (comment) =>
  fetch(`${url}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment })
  }).then(res => res.json());

export const voteComment = (id, option) =>
  fetch(`${url}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json());

// Put Methods
export const editPost = (id, post) =>
  fetch(`${url}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ post })
  }).then(res => res.json());

export const editComment = (id, comment) =>
  fetch(`${url}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment })
  }).then(res => res.json());

// Delete Methods
export const deletePost = (id) =>
  fetch(`${url}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers
    }
  }).then(res => res.json());

export const deleteComment = (id) =>
  fetch(`${url}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers
    }
  }).then(res => res.json());