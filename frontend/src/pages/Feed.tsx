import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const Feed: React.FC = () => {
  const { posts, loading, error } = useContext(DataContext);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  // Sort posts by id in descending order
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Feed</Typography>
      {sortedPosts.length === 0 ? (
        <Typography>No posts available</Typography>
      ) : (
        <List>
          {sortedPosts.map(post => (
            <ListItem key={post.id}>
              <ListItemText primary={`Post ${post.id}: ${post.content}`} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Feed;