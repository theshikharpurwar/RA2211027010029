import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts'; 
import Feed from './pages/Feed';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Social Media Analytics
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Top Users
          </Button>
          <Button color="inherit" component={Link} to="/trending">
            Trending Posts
          </Button>
          <Button color="inherit" component={Link} to="/feed">
            Feed
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<TopUsers />} />
        <Route path="/trending" element={<TrendingPosts />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
  );
};

export default App;