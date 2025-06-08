import React from 'react';
import { useLoaderData } from 'react-router';
import ArticleCard from './ArticleCard';

const AllArticles = () => {
    const allArticlesData = useLoaderData();

    return (
        <div>
            <h1 className="text-2xl font-bold  mb-6 text-center">
                All Articles
            </h1>
            <div className="px-2.5 max-w-5xl mx-auto">
                {allArticlesData.length > 0 ? (
                    allArticlesData.map(article => (
                        <ArticleCard key={article._id} article={article} />
                    ))
                ) : (
                    <p className="text-center text-gray-600">No articles available</p>
                )}
            </div>
        </div>
    );
};

export default AllArticles;
