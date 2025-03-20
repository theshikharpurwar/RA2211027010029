import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const TrendingPosts: React.FC = () => {
  const { posts, comments, loading, error } = useContext(DataContext);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  // Calculate comment counts for each post
  const postCommentCounts = posts.map(post => ({
    ...post,
    commentCount: comments[post.id]?.length || 0,
  }));

  // Find the maximum number of comments
  const maxComments = Math.max(...postCommentCounts.map(p => p.commentCount), 0);

  // Filter posts with the maximum number of comments
  const trendingPosts = postCommentCounts.filter(p => p.commentCount === maxComments);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Trending Posts</Typography>
      {trendingPosts.length === 0 ? (
        <Typography>No trending posts available</Typography>
      ) : (
        <List>
          {trendingPosts.map(post => (
            <ListItem key={post.id}>
              <ListItemText
                primary={`Post ${post.id}: ${post.content}`}
                secondary={`${post.commentCount} comments`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default TrendingPosts;