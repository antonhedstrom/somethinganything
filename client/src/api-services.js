import axios from 'axios';

// Something
export function getSomething(id) {
  return axios.get(`/api/something/${id}`);
}
export function getSomethings(params) {
  return axios.get('/api/something', {
    params,
  });
}
export function createSomething(data) {
  return axios.post('/api/something', data);
}
export function updateSomething(id, data) {
  return axios.post(`/api/something/${id}`, data);
}
export function removeSomething(id) {
  return axios.delete(`/api/something/${id}`);
}

// Anything
export function getAnything(id) {
  return axios.get(`/api/anything/${id}`);
}
export function getAnythings(params) {
  return axios.get('/api/anything', {
    params,
  });
}
export function createAnything(data) {
  return axios.post('/api/anything', data);
}
export function updateAnything(id, data) {
  return axios.post(`/api/anything/${id}`, data);
}
export function removeAnything(id) {
  return axios.delete(`/api/anything/${id}`);
}

// Tag
export function getTag(id) {
  return axios.get(`/api/tag/${id}`);
}
export function getTags(params) {
  return axios.get('/api/tag', {
    params,
  });
}
export function createTag(data) {
  return axios.post('/api/tag', data);
}
export function updateTag(id, data) {
  return axios.post(`/api/tag/${id}`, data);
}
export function removeTag(id) {
  return axios.delete(`/api/tag/${id}`);
}
