import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Removed unused api import
import projectService from '../services/projectService';

// Async thunk to fetch all projects
export const fetchAllProjects = createAsyncThunk(
  'projects/fetchAllProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await projectService.getAllProjectsWithComments();
      return response; // Assuming the response is an array of projects with comments
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch projects for a specific user
export const fetchUserProjects = createAsyncThunk(
  'projects/fetchUserProjects',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await projectService.getUserProjects(userId);
      return response; // Assuming the response is an array of projects
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to create a new project
export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await projectService.createProject(projectData);
      return response; // Assuming the created project data is returned
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch a single project by ID
export const fetchProjectById = createAsyncThunk(
    'projects/fetchProjectById',
    async (projectId, { rejectWithValue }) => {
        try {
            const response = await projectService.getProjectComments(projectId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to add a comment to a project
export const addComment = createAsyncThunk(
    'projects/addComment',
    async ({ projectId, commentData }, { rejectWithValue, dispatch }) => {
        try {
            const newComment = await projectService.addCommentToProject(projectId, commentData);
            dispatch(addCommentToProjectState({ projectId, comment: newComment }));
            return newComment;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to search projects
export const searchProjects = createAsyncThunk(
    'projects/searchProjects',
    async (searchTerm, { rejectWithValue }) => {
        try {
            const response = await projectService.searchProjects(searchTerm);
            return response; // Assuming the response is an array of projects
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    allProjects: [],
    userProjects: [],
    currentProject: null,
    searchResults: [],
    loading: false,
    error: null,
  },
  reducers: {
    addProject: (state, action) => {
      state.allProjects.push(action.payload);
    },
    addCommentToProjectState: (state, action) => {
        const { projectId, comment } = action.payload;
        const projectIndex = state.allProjects.findIndex(project => project._id === projectId);
        if (projectIndex !== -1) {
            if (!state.allProjects[projectIndex].comments) {
                state.allProjects[projectIndex].comments = [];
            }
            state.allProjects[projectIndex].comments.push(comment);
        }
        if (state.currentProject && state.currentProject._id === projectId) {
             if (!state.currentProject.comments) {
                state.currentProject.comments = [];
             }
            state.currentProject.comments.push(comment);
        }
    },
    clearSearchResults: (state) => {
        state.searchResults = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Projects
      .addCase(fetchAllProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.allProjects = action.payload;
        state.searchResults = []; // Clear search results when fetching all projects
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch User Projects
      .addCase(fetchUserProjects.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(fetchUserProjects.fulfilled, (state, action) => {
          state.loading = false;
          state.userProjects = action.payload;
      })
      .addCase(fetchUserProjects.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
      })
      // Create Project
      .addCase(createProject.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.allProjects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
      })
      // Fetch Project By ID
      .addCase(fetchProjectById.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.currentProject = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.currentProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.currentProject = null;
      })
      // Add Comment (handled by the addCommentToProjectState reducer)
      .addCase(addComment.pending, (state) => {
          // Optional: set a submittingComment loading state
      })
      .addCase(addComment.fulfilled, (state, action) => {
          // Optional: clear submittingComment loading state
      })
      .addCase(addComment.rejected, (state, action) => {
          // Optional: set a comment error state
      })
      // Search Projects
      .addCase(searchProjects.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.searchResults = []; // Clear previous search results
      })
      .addCase(searchProjects.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.searchResults = action.payload;
      })
      .addCase(searchProjects.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.searchResults = [];
      });
  },
});

export const { addProject, addCommentToProjectState, clearSearchResults } = projectsSlice.actions;
export default projectsSlice.reducer;
