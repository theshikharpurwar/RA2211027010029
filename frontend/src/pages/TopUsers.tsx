import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const TopUsers: React.FC = () => {
  const { users, posts, loading, error } = useContext(DataContext);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  // Calculate post counts for each user
  const userPostCounts = Object.keys(users).map(userId => ({
    userId,
    name: users[userId],
    postCount: posts.filter(post => post.userid === parseInt(userId)).length, // Convert userId to number
  }));

  // Sort by post count and take top 5
  const topUsers = userPostCounts
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Top Users</Typography>
      {topUsers.length === 0 ? (
        <Typography>No users available</Typography>
      ) : (
        <List>
          {topUsers.map(user => (
            <ListItem key={user.userId}>
              <ListItemText primary={`${user.name}: ${user.postCount} posts`} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default TopUsers;