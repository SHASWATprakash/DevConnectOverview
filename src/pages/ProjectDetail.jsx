import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import projectService from '../services/projectService';
import { useAuth } from '../contexts/AuthContext';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { user } = useAuth(); // Get the logged-in user

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState(null);

  // Effect to fetch project details and comments
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        // Assuming an API endpoint like /api/projects/:projectId with comments included
        const projectResponse = await projectService.getProjectComments(projectId); // Use getProjectComments
        setProject(projectResponse); // Assuming the response is the project object with comments
      } catch (err) {
        setError(err);
        console.error('Error fetching project details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId]); // Depend on projectId

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return; // Prevent adding empty comments
    if (!user) {
        setCommentError("You must be logged in to leave a comment.");
        return;
    }

    setSubmittingComment(true);
    setCommentError(null);

    try {
      // Assuming an API endpoint like /api/projects/:projectId/comments
      const newComment = await projectService.addCommentToProject(projectId, { text: commentText, userId: user._id }); // Add userId
      // Update the project state with the new comment
      setProject(prevProject => ({
        ...prevProject,
        comments: [...(prevProject.comments || []), newComment] // Add the new comment
      }));
      setCommentText(''); // Clear the comment input
    } catch (err) {
      setCommentError(err.message || 'Failed to add comment.');
      console.error('Error adding comment:', err);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading project...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading project: {error.message}</div>;
  }

  if (!project) {
    return <div className="text-center py-8">Project not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{project.title}</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">{project.description}</p>

      {/* Display Relevant Links */}
      {project.links && project.links.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Relevant Links</h2>
          <ul>
            {project.links.map((link, index) => (
              <li key={index}><a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{link}</a></li>
            ))}
          </ul>
        </div>
      )}

      {/* Comments Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Comments ({project.comments ? project.comments.length : 0})</h2>
        <div className="space-y-4">
          {project.comments && project.comments.length > 0 ? (
            project.comments.map(comment => (
              <div key={comment._id} className="border rounded-lg p-3 bg-gray-100 dark:bg-gray-800">
                <p className="text-gray-800 dark:text-gray-200">{comment.text}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">by {comment.author ? comment.author.name : 'Unknown'} on {new Date(comment.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>

      {/* Add Comment Form */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Add a Comment</h3>
        {user ? (
          <form onSubmit={handleAddComment}>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              rows="4"
              placeholder="Leave a comment..."
              value={commentText}
              onChange={handleCommentChange}
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={submittingComment}
            >
              {submittingComment ? 'Adding...' : 'Add Comment'}
            </button>
            {commentError && <p className="text-red-500 text-xs italic mt-2">{commentError}</p>}
          </form>
        ) : (
          <p className="text-red-500">You must be logged in to leave a comment.</p>
        )}
      </div>

    </div>
  );
};

export default ProjectDetail;
