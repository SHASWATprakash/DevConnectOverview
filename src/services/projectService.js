// src/services/projectService.js
import api from './api';
import endpoints from './endpoints';

const projectService = {
  getUserProjects: async (userId) => {
    try {
      const url = endpoints.user.projects(userId);
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching user projects:', error);
      throw error; // Re-throw the error for handling in the component
    }
  },

  getProjectComments: async (projectId) => {
    try {
      const url = `/projects/${projectId}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching project details with comments:', error);
      throw error;
    }
  },

  getAllProjectsWithComments: async () => {
    try {
      const url = '/projects';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching all projects with comments:', error);
      throw error;
    }
  },

  getUserProfile: async (userId) => {
    try {
      const url = `/users/${userId}`;
      const response = await api.get(url);
      return response;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  updateUserProfile: async (userId, profileData) => {
    try {
      const url = `/users/${userId}`;
      const response = await api.put(url, profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  createProject: async (projectData) => {
    try {
      const url = '/projects';
      const response = await api.post(url, projectData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  addCommentToProject: async (projectId, commentData) => {
    try {
      const url = `/projects/${projectId}/comments`;
      const response = await api.post(url, commentData);
      return response.data;
    } catch (error) {
      console.error('Error adding comment to project:', error);
      throw error;
    }
  },

  searchProjects: async (searchTerm) => { // Added searchProjects function
    try {
      // Assuming your backend endpoint for searching projects is /api/projects/search?term=...
      const url = `/projects/search?term=${encodeURIComponent(searchTerm)}`;
      const response = await api.get(url);
      return response.data; // Assuming the response is an array of matching projects
    } catch (error) {
      console.error('Error searching projects:', error);
      throw error;
    }
  },

  searchUsers: async (searchTerm) => { // Added searchUsers function placeholder
    try {
      // Assuming your backend endpoint for searching users is /api/users/search?term=...
      const url = `/users/search?term=${encodeURIComponent(searchTerm)}`;
       // This is a placeholder. You will need to implement the actual API call.
       console.warn("searchUsers function is a placeholder and needs backend implementation.");
      const response = await api.get(url); // Placeholder API call
      return response.data; // Assuming the response is an array of matching users
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  }
};

export default projectService;
