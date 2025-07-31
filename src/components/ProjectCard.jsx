import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Assuming you have an api service

const ProjectCard = ({ project }) => {
  const [likes, setLikes] = useState(project.likes || 0);
  const [dislikes, setDislikes] = useState(project.dislikes || 0);
  const [userVote, setUserVote] = useState(null); // 'like', 'dislike', or null
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);

  // Effect to fetch comments when showComments becomes true
  useEffect(() => {
    if (showComments && comments.length === 0) {
      const fetchComments = async () => {
        setLoadingComments(true);
        try {
          // Assuming an API endpoint like /api/projects/:projectId/comments
          const response = await api.get(`/api/projects/${project._id}/comments`);
          setComments(response.data);
        } catch (error) {
          console.error('Error fetching comments:', error);
        } finally {
          setLoadingComments(false);
        }
      };
      fetchComments();
    }
  }, [showComments, project._id, comments.length]); // Depend on showComments and project._id

  const handleLike = async () => {
    try {
      // Assuming an API endpoint like POST /api/projects/:projectId/like
      await api.post(`/api/projects/${project._id}/like`);
      // Update state based on the response or assuming success
      if (userVote === 'like') {
        setLikes(likes - 1);
        setUserVote(null);
      } else {
        if (userVote === 'dislike') {
          setDislikes(dislikes - 1);
        }
        setLikes(likes + 1);
        setUserVote('like');
      }
    } catch (error) {
      console.error('Error liking project:', error);
    }
  };

  const handleDislike = async () => {
    try {
      // Assuming an API endpoint like POST /api/projects/:projectId/dislike
      await api.post(`/api/projects/${project._id}/dislike`);
       // Update state based on the response or assuming success
       if (userVote === 'dislike') {
        setDislikes(dislikes - 1);
        setUserVote(null);
      } else {
        if (userVote === 'like') {
          setLikes(likes - 1);
        }
        setDislikes(dislikes + 1);
        setUserVote('dislike');
      }
    } catch (error) {
      console.error('Error disliking project:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      // Assuming an API endpoint like POST /api/projects/:projectId/comments
      const response = await api.post(`/api/projects/${project._id}/comments`, { text: newComment });
      setComments([...comments, response.data]); // Add the new comment to the state
      setNewComment(''); // Clear the input field
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">{project.title}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

      {/* Like/Dislike Buttons */}
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={handleLike}
          className={`flex items-center text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 ${userVote === 'like' ? 'text-blue-500 dark:text-blue-400' : ''}`}
        >
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
          {likes}
        </button>
        <button
          onClick={handleDislike}
           className={`flex items-center text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 ${userVote === 'dislike' ? 'text-red-500 dark:text-red-400' : ''}`}
        >
           <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M18.364 16.894l-14.732-14.732L1.932 3.51 3.346 4.924l-.707.707c-1.562 1.562-1.562 4.095 0 5.657l2.121 2.121.707.707-1.414 1.414-1.414 1.414 1.414 1.414 1.414-1.414.707-.707 2.121 2.121c1.562 1.562 4.095 1.562 5.657 0l.707-.707 2.121 2.121.707.707 1.414-1.414zm-2.121-2.121l-4.243-4.243 2.121-2.121 4.243 4.243-2.121 2.121zM4.222 6.343l1.414 1.414L3.51 9.172l-1.414-1.414c-.78-.78-.78-2.047 0-2.828l1.414-1.414z"/></svg>
          {dislikes}
        </button>
      </div>

      {/* Comments Section */}
      <div className="mt-4">
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {showComments ? 'Hide Comments' : `Show Comments (${comments.length})`}
        </button>

        {showComments && (
          <div className="mt-4">
            {loadingComments ? (
              <p>Loading comments...</p>
            ) : (
              comments.map(comment => (
                <div key={comment._id} className="border-b pb-2 mb-2">
                  <p className="text-gray-800 dark:text-gray-200">{comment.text}</p>
                  {/* Display comment author and timestamp if available */}
                </div>
              ))
            )}

            {/* Add new comment form */}
            <form onSubmit={handleAddComment} className="mt-4">
              <textarea
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                rows="3"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Comment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
