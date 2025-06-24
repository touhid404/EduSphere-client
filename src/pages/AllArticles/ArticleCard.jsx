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
    authorName,
    
  } = article;

  return (
    <div className=" border border-gray-500 rounded-2xl p-6 shadow-md mb-6 hover:shadow-lg transition-shadow duration-200">
      
        <div>
          <p className="font-semibold text-sm">{authorName || 'Unknown Author'}</p>
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

      <div className="flex items-center justify-between text-sm  border-t  ">
        
        <Link to={`/articleDetail/${_id}`}>
           <span className="text-xs  italic btn btn-ghost mt-2"> read more
        </span>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
