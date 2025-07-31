import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link
import ProjectCard from '../components/ProjectCard';
import { fetchAllProjects, searchProjects, clearSearchResults } from '../redux/projectsSlice'; // Import searchProjects and clearSearchResults
import { searchUsers, clearUserSearchResults, selectUserSearchResults } from '../redux/loginSlice'; // Import user search actions and selector
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  console.log('🏠 HomePage component rendered');
  const dispatch = useDispatch();
  const { logout } = useAuth();

  // Get data from Redux slices
  const { allProjects, loading: projectsLoading, searchResults: projectSearchResults } = useSelector((state) => state.projects);
  const { userSearchResults, loading: userSearchLoading } = useSelector(selectUserSearchResults); // Use selector for user search results

  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('projects'); // 'projects' or 'users'
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    console.log('🔄 HomePage initial data fetch effect triggered');
    // Fetch all projects on initial load
    dispatch(fetchAllProjects());
  }, [dispatch]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearching(true);
      if (searchType === 'projects') {
        dispatch(searchProjects(searchTerm));
        dispatch(clearUserSearchResults()); // Clear user results when searching projects
      } else {
        dispatch(searchUsers(searchTerm));
        dispatch(clearSearchResults()); // Clear project results when searching users
      }
    } else {
      setIsSearching(false);
      dispatch(fetchAllProjects()); // Refetch all projects if search term is empty
      dispatch(clearSearchResults()); // Clear search results
      dispatch(clearUserSearchResults()); // Clear user search results
    }
  };

  const handleSearchTypeChange = (type) => {
      setSearchType(type);
      // Clear search results when changing search type
      dispatch(clearSearchResults());
      dispatch(clearUserSearchResults());
      setSearchTerm(''); // Clear search term as well
      setIsSearching(false);
      dispatch(fetchAllProjects()); // Fetch all projects when switching from search mode
  };

  const projectsToDisplay = isSearching && searchType === 'projects' ? projectSearchResults : allProjects;
  const usersToDisplay = isSearching && searchType === 'users' ? userSearchResults : [];

  const loading = isSearching ? (searchType === 'projects' ? projectsLoading : userSearchLoading) : projectsLoading;

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-3xl font-bold text-center mb-8">Developer Portfolio</h1>

      <button
        onClick={logout}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>

      {/* Search Bar and Type Toggle */}
      <div className="flex flex-col items-center mb-8">
        <form onSubmit={handleSearchSubmit} className="w-full max-w-md flex mb-4">
          <input
            type="text"
            placeholder={searchType === 'projects' ? 'Search projects by title or description...' : 'Search users by username...'}
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </form>
        <div className="flex space-x-4">
            <button
                onClick={() => handleSearchTypeChange('projects')}
                className={
                    `py-2 px-4 rounded ` +
                    (searchType === 'projects' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
                }
            >
                Search Projects
            </button>
             <button
                onClick={() => handleSearchTypeChange('users')}
                 className={
                    `py-2 px-4 rounded ` +
                    (searchType === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
                }
            >
                Search Users
            </button>
        </div>
      </div>

      {
        loading ? (
          <p className="text-center">Loading {isSearching ? searchType : 'projects'}...</p>
        ) : (
          <>
            {isSearching && searchType === 'projects' && projectSearchResults.length > 0 && (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectSearchResults.map(project => (
                      <ProjectCard key={project._id} project={project} />
                    ))}
                 </div>
            )}
             {isSearching && searchType === 'users' && usersToDisplay.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {usersToDisplay.map(user => (
                        <div key={user._id} className="border rounded-lg p-4 flex flex-col items-center">
                            <h3 className="text-xl font-semibold mb-2">{user.username}</h3>
                            {/* Link to user profile */}
                            <Link to={`/profile/${user._id}`} className="text-blue-500 hover:underline">View Profile</Link>
                        </div>
                    ))}
                </div>
             )}
            {!isSearching && allProjects.length > 0 && (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allProjects.map(project => (
                      <ProjectCard key={project._id} project={project} />
                    ))}
                 </div>
            )}
             {!loading && isSearching && projectsToDisplay.length === 0 && searchTerm.trim() && searchType === 'projects' && (
                <p className="text-center">No projects found for your search term.</p>
            )}
             {!loading && isSearching && usersToDisplay.length === 0 && searchTerm.trim() && searchType === 'users' && (
                <p className="text-center">No users found for your search term.</p>
            )}
             {!loading && !isSearching && allProjects.length === 0 && (
                 <p className="text-center">No projects available.</p>
             )}
          </>
        )
      }
    </div>
  );
};

export default HomePage;
