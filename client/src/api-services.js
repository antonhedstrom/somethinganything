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
export function updateSomething(data) {
  const { id, ...values } = data;
  return axios.patch(`/api/something/${id}`, values);
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
export function updateAnything(data) {
  const { id, ...values } = data;
  return axios.patch(`/api/anything/${id}`, values);
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
export function updateTag(data) {
  const { id, ...values} = data;
  return axios.patch(`/api/tag/${id}`, values);
}
export function removeTag(id) {
  return axios.delete(`/api/tag/${id}`);
}

// Search
export function searchAll(term) {
  return axios.get(`/api/search?term=${term}`);
}
