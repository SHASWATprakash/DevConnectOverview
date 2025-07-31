import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser, setLoginUser } from '../redux/loginSlice'; // Import setLoginUser
import projectService from '../services/projectService';

const ProfilePage = () => {
  const { userId } = useParams();
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  const [profileUser, setProfileUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('projects');
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [formData, setFormData] = useState({}); // State for form data

  const isOwnProfile = loggedInUser && profileUser && loggedInUser._id === profileUser._id; // Check if it's the logged-in user's profile

  // Effect to fetch user profile and projects
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const userResponse = await projectService.getUserProfile(userId);
        setProfileUser(userResponse.data); // Assuming user data is in response.data

        const projectsResponse = await projectService.getUserProjects(userId); // Use getUserProjects
        setProjects(projectsResponse); // Assuming projects data is the response itself

        // Initialize form data when profileUser is set and it's the user's own profile
        if (loggedInUser && userResponse.data && loggedInUser._id === userResponse.data._id) {
             setFormData({ ...userResponse.data });
        }

      } catch (err) {
        setError(err);
        console.error('Error fetching profile data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfileData();
    } else if (loggedInUser) { // Fetch logged-in user's profile if no userId in URL
        setProfileUser(loggedInUser);
        setFormData({ ...loggedInUser }); // Initialize form data
        // Fetch logged-in user's projects
        const fetchUserProjects = async () => {
            try {
                const projectsResponse = await projectService.getUserProjects(loggedInUser._id);
                setProjects(projectsResponse);
            } catch (err) {
                 console.error('Error fetching user projects:', err);
            }
        };
        fetchUserProjects();
        setLoading(false); // Set loading to false as user data is available
    } else {
        setLoading(false);
        setError(new Error("No user ID provided and no user is logged in."));
    }

  }, [userId, loggedInUser]); // Depend on userId and loggedInUser

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Call the new update profile service function
      const updatedUser = await projectService.updateUserProfile(loggedInUser._id, formData);
      dispatch(setLoginUser(updatedUser)); // Update user in Redux store
      setProfileUser(updatedUser); // Update local state as well
      setIsEditing(false); // Exit edit mode
    } catch (err) {
      setError(err);
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading profile: {error.message}</div>;
  }

  if (!profileUser) {
      return <div className="text-center py-8">Profile not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{profileUser.username || profileUser.name}'s Profile</h1> {/* Use username or name */}

      {isOwnProfile && !isEditing && (
        <div className="text-center mb-4">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit Profile
          </button>
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username || ''}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Add other profile fields like bio, etc. */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
           {/* Display profile information when not editing */}
           <div className="mb-4">
               <h2 className="text-xl font-bold">About Me</h2>
               <p>{profileUser.bio || 'No bio available.'}</p> {/* Assuming a bio field */}
           </div>
           {/* Add other profile information fields here */}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-4 mt-8">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            className={
              `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ` +
              (activeTab === 'projects'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300')
            }
            onClick={() => setActiveTab('projects')}
          >
            Projects ({projects.length})
          </button>
          {/* Add other tabs if needed */}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'projects' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            {
              projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Render Project Cards here if you have a reusable component */}
                  {/* For now, just listing project titles */}
                  {projects.map(project => (
                    <div key={project._id} className="border rounded-lg p-4">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No projects found.</p>
              )
            }
          </div>
        )}
        {/* Add content for other tabs if needed */}
      </div>
    </div>
  );
};

export default ProfilePage;
