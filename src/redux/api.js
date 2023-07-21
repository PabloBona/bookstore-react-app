import axios from 'axios';

const API_URL = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/Fm2ydOLEbPj67CnsICQF';

const api = axios.create({
  baseURL: API_URL,
});

export default api;
