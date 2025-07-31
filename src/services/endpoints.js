// src/services/endpoints.js
const endpoints = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
  },
  user: {
    profile: (userId) => `/user/${userId}/profile`,
    projects: (userId) => `/user/${userId}/projects`,
    comments: (userId) => `/user/${userId}/comments`,
  },
  projects: {
    getProject: (projectId) => `/projects/${projectId}`,
    getComments: (projectId) => `/projects/${projectId}/comments`,
    addComment: (projectId) => `/projects/${projectId}/comments`,
  },
};

export default endpoints;
