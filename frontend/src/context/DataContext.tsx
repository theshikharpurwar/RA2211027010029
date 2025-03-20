import React, { createContext, useState, useEffect } from 'react';
// import { getUsers, getPosts, getComments } from '../services/api';

interface User {
  [key: string]: string;
}

interface Post {
  id: number;
  userid: number;
  content: string;
}

interface Comment {
  id: number;
  postid: number;
  content: string;
}

interface DataContextType {
  users: User;
  posts: Post[];
  comments: { [postId: number]: Comment[] };
  fetchData: () => void;
  loading: boolean;
  error: string | null;
}

export const DataContext = createContext<DataContextType>({
  users: {},
  posts: [],
  comments: {},
  fetchData: () => {},
  loading: false,
  error: null,
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User>({});
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<{ [postId: number]: Comment[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Mock data
      const mockUsers = {
        "1": "John Doe",
        "2": "Jane Smith",
        "3": "Alice Johnson",
      };
      setUsers(mockUsers);
      console.log("Mocked Users:", mockUsers);

      const mockPosts = [
        { id: 1, userid: 1, content: "First post by John" },
        { id: 2, userid: 1, content: "Second post by John" },
        { id: 3, userid: 2, content: "Post by Jane" },
      ];
      setPosts(mockPosts);
      console.log("Mocked Posts:", mockPosts);

      const mockComments = {
        1: [
          { id: 1, postid: 1, content: "Great post!" },
          { id: 2, postid: 1, content: "Nice one!" },
        ],
        2: [{ id: 3, postid: 2, content: "Cool!" }],
        3: [],
      };
      setComments(mockComments);
      console.log("Mocked Comments:", mockComments);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DataContext.Provider
      value={{ users, posts, comments, fetchData, loading, error }}
    >
      {children}
    </DataContext.Provider>
  );
};