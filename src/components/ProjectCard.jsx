import React, { useState } from 'react';
import api from '../services/api';
import CommentSection from './CommentSection';

const ProjectCard = ({ project }) => {
  const [likes, setLikes] = useState(project.likes || 0);
  const [dislikes, setDislikes] = useState(project.dislikes || 0);
  const [userVote, setUserVote] = useState(null); // 'like', 'dislike', or null

  const handleLike = async () => {
    try {
      await api.post(`/api/projects/${project._id}/like`);
      if (userVote === 'like') {
        setLikes((prev) => prev - 1);
        setUserVote(null);
      } else {
        if (userVote === 'dislike') setDislikes((prev) => prev - 1);
        setLikes((prev) => prev + 1);
        setUserVote('like');
      }
    } catch (error) {
      console.error('Error liking project:', error);
    }
  };

  const handleDislike = async () => {
    try {
      await api.post(`/api/projects/${project._id}/dislike`);
      if (userVote === 'dislike') {
        setDislikes((prev) => prev - 1);
        setUserVote(null);
      } else {
        if (userVote === 'like') setLikes((prev) => prev - 1);
        setDislikes((prev) => prev + 1);
        setUserVote('dislike');
      }
    } catch (error) {
      console.error('Error disliking project:', error);
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
          👍 {likes}
        </button>
        <button
          onClick={handleDislike}
          className={`flex items-center text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 ${userVote === 'dislike' ? 'text-red-500 dark:text-red-400' : ''}`}
        >
          👎 {dislikes}
        </button>
      </div>

      {/* Comment Section */}
      <CommentSection projectId={project.id} />
    </div>
  );
};

export default ProjectCard;
