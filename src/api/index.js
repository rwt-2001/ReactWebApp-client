import axios from 'axios';
import { HEROKU_URL } from '../constants/constants';
const localHost = 'http://localhost:5000';
const API = axios.create({ baseURL: localHost });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile'))?.token}`
    }

    return req;
})
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const signIn = (FormData) => API.post('/user/signin', FormData);
export const signUp = (FormData) => API.post('/user/signup', FormData);
export const googleSignIn = (formData) => API.post('/user/googlesignin', formData);