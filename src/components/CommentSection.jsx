// src/components/CommentSection.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import endpoints from '../services/endpoints';
import moment from 'moment';

const CommentSection = ({ projectId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await api.get(endpoints.projects.getComments(projectId));
      setComments(res.data);
    } catch (err) {
      console.error('Error loading comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (expanded && comments.length === 0) {
      fetchComments();
    }
  }, [expanded]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await api.post(endpoints.projects.addComment(projectId), {
        text: newComment,
      });
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        {expanded ? 'Hide Comments' : `Show Comments (${comments.length})`}
      </button>

      {expanded && (
        <div className="mt-4">
          {loading ? (
            <p>Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-gray-500 italic">No comments yet.</p>
          ) : (
            <ul className="space-y-3 mb-4">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="bg-gray-100 dark:bg-gray-800 p-3 rounded border"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-blue-700 dark:text-blue-300">
                      {comment.user?.name || 'Anonymous'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {moment(comment.createdAt).fromNow()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    {comment.text}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleAddComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              rows={3}
              placeholder="Add a comment..."
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Comment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
