import axios from 'axios';

interface UsersResponse {
  users: { [key: string]: string };
}

interface PostsResponse {
  posts: Array<{
    id: number;
    userid: number;
    content: string;
  }>;
}

interface CommentsResponse {
  comments: Array<{
    id: number;
    postid: number;
    content: string;
  }>;
}

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNDc2NDgzLCJpYXQiOjE3NDI0NzYxODMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjRkZTQwYWMxLWNiOGItNDhjYi1hYTdmLTFmODVmNzZkZGNmOSIsInN1YiI6InNwMTgwN0Bzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiU1JNIFVuaXZlcnNpdHkiLCJjbGllbnRJRCI6IjRkZTQwYWMxLWNiOGItNDhjYi1hYTdmLTFmODVmNzZkZGNmOSIsImNsaWVudFNlY3JldCI6Ik1WQ1lxUXhnb01IZExGVlYiLCJvd25lck5hbWUiOiJTaGlraGFyIFB1cndhciIsIm93bmVyRW1haWwiOiJzcDE4MDdAc3JtaXN0LmVkdS5pbiIsInJvbGxObyI6IlJBMjIxMTAyNzAxMDAyOSJ9.8mB1Rss1O6whgGXY1ou11lnyuiArNwXai1fDT0duqzE';

const api = axios.create({
  baseURL: '/test', // Use relative path; the proxy will forward to http://20.244.56.144/test
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const getUsers = () => api.get<UsersResponse>('/users');
export const getPosts = (userId: string) =>
  api.get<PostsResponse>(`/users/${userId}/posts`);
export const getComments = (postId: string) =>
  api.get<CommentsResponse>(`/posts/${postId}/comments`);