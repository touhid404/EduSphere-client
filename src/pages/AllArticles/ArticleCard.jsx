import React from 'react';
import { FaRegThumbsUp, FaRegComment } from 'react-icons/fa';
import { FaInfo } from 'react-icons/fa6';
import { Link } from 'react-router';

const ArticleCard = ({ article }) => {
  const {
    _id,
    title,
    tags = [],
    thumbnail,
    postDate,
    author = {},
    reactions = 0,
    comments = 0,
  } = article;

  return (
    <div className=" border border-gray-500 rounded-2xl p-6 shadow-md mb-6 hover:shadow-lg transition-shadow duration-200">
      
        <div>
          <p className="font-semibold text-sm">{author.username || 'Unknown Author'}</p>
          <p className="text-xs ">{postDate}</p>
        </div>

      {title && <h2 className="text-lg font-bold  my-2.5">{title}</h2>}

    

      {thumbnail && (
        <img
          src={thumbnail}
          alt="Post"
          className="w-full max-h-72 object-cover rounded-xl mb-4"
        />
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 text-sm mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-sm  border-t pt-3 mt-3">
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-1">
            <FaRegThumbsUp size={18} className="text-blue-500" /> {reactions}
          </span>
          <span className="flex items-center gap-1">
            <FaRegComment size={18} className="text-green-500" /> {comments}
          </span>
        </div>
        <Link to={`/articleDetail/${_id}`}>
           <span className="text-xs text-gray-500 italic btn btn-ghost"> read more
        </span>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
