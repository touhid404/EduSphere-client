import { FaRegThumbsUp, FaRegCommentDots } from 'react-icons/fa';

const FeaturedArticles = ({ featuredArticleData }) => {
  

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Featured Articles</h2>

      {/* Responsive Grid: 1 column on small, 2 on md and up */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredArticleData.map((article) => (
          <div
            key={article._id}
            className=" rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow"
          >
            {/* Author Info */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={article.authorProfile}
                alt={article.authorName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium ">{article.authorName}</p>
                <p className="text-sm text-gray-500">{article.postDate}</p>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-3">{article.title}</h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between  text-sm mb-4">
  <div className="flex items-center gap-6">
    <span className="flex items-center gap-2">
      <FaRegThumbsUp size={18} className="text-blue-500" />
      <span>{article.likeCount} {article.likeCount === 1 ? 'like' : 'likes'}</span>
    </span>

    <span className="flex items-center gap-2">
      <FaRegCommentDots size={18} className="" />
      <span>
        {article.commentCount} {article.commentCount === 1 ? 'Comment' : 'Comments'}
      </span>
    </span>
  </div>
</div>


            {/* Read More Button */}
            <a
              href={`/articleDetail/${article._id}`}
              className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedArticles;
