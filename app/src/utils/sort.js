export const sortByVoteScore = posts => {
  return Array.isArray(posts)
    ? posts.sort((a, b) => b.voteScore - a.voteScore)
    : posts;
};

export const sortByTimeStamp = posts => {
  return Array.isArray(posts)
    ? posts.sort((a, b) => b.timestamp - a.timestamp)
    : posts;
};
